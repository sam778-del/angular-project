import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, from, of, EMPTY, throwError } from 'rxjs';
import { map, concatMap, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Account } from './account';

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })


export class AccountService {
    private accountSubject: BehaviorSubject<Account | null>;
    public account: Observable<Account | null>;
    public error: Observable<Account | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.accountSubject = new BehaviorSubject<Account | null>(null);
        this.account = this.accountSubject.asObservable();
        this.error = this.accountSubject.asObservable()
    }

    public get accountValue() {
        return this.accountSubject.value;
    }



    loginFacebookSdk() {
        // login with facebook then the API to get a JWT auth token
        return this.loginFacebook().pipe(
            concatMap(accessToken => this.loginApi(accessToken))
        );
    }

    loginFacebook() {
        // login with facebook and return observable with fb access token on success
        const fbLoginPromise = new Promise<fb.StatusResponse>(resolve => FB.login(resolve));
        return from(fbLoginPromise).pipe(
            concatMap(({ authResponse }) => authResponse ? of(authResponse.accessToken) : EMPTY)
        );
    }

    loginApi(accessToken: string) {
        // authenticate with the api using a facebook access token,
        // on success the api returns an account object with a JWT auth token
        return this.http.post<any>(`${baseUrl}/facebook/auth`, { accessToken })
            .pipe(
                map(account => {
                    // store account and token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('account', JSON.stringify(account));
                    localStorage.setItem('token', account.token);
                    return account;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    logout() {
        localStorage.removeItem('account');
        this.accountSubject.next(null);
        this.router.navigate(['/auth/login']);
    }

    checkTokenValidity(): Observable<boolean> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.accountSubject.value}`
            })
        };
    
        // check if the token is valid by sending a GET request to the API
        return this.http.get<boolean>(`${baseUrl}/facebook/checkToken`, httpOptions).pipe(
            map(valid => {
                console.log(valid);
                if (!valid) {
                    // remove user from local storage to log user out
                    // this.logout();
                }
                return valid;
            }),
            catchError(error => {
                // handle error and remove user from local storage to log user out
                console.error(error);
                // this.logout();
                return throwError(error);
            })
        );
    }    
}