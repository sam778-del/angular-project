import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, from, of, EMPTY, throwError, tap } from 'rxjs';
// import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import { createAuth0Client, Auth0Client } from '@auth0/auth0-spa-js';
import { map, concatMap, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Account } from './account';
import { checkToken } from '../models/user.model';

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })


export class AccountService {
    private accountSubject: BehaviorSubject<Account | null>;
    public account: Observable<Account | null>;
    public error: Observable<Account | null>;

    // auth0
    private auth0Client$: BehaviorSubject<Auth0Client | null> = new BehaviorSubject<Auth0Client | null>(null);
    private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private accessToken$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

    public async initAuth0Client(): Promise<void> {
        const auth0Client = await createAuth0Client({
            domain: environment.auth0.domain,
            clientId: environment.auth0.clientId,
            authorizationParams: {
                redirect_uri: environment.auth0.redirectUri
            }
        });
        this.auth0Client$.next(auth0Client);
    }

    public async handleAuthCallback(): Promise<void> {
        const auth0Client = await this.auth0Client$.getValue();
        if (!auth0Client) {
            throw new Error('Auth0 client not initialized');
        }
        const result = await auth0Client.handleRedirectCallback();
        const accessToken = await auth0Client.getTokenSilently();
        this.accessToken$.next(accessToken);
        this.isAuthenticated$.next(true);
    }

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.accountSubject = new BehaviorSubject<Account | null>(null);
        this.account = this.accountSubject.asObservable();
        this.error = this.accountSubject.asObservable();
        this.initAuth0Client();
    }

    public async loginWithRedirect(): Promise<void> {
        const auth0Client = this.auth0Client$.value;
        if (!auth0Client) {
            throw new Error('Auth0 client not initialized');
        }

        try {
            await auth0Client.loginWithRedirect();
            this.isAuthenticated$.next(true);
        } catch (error) {
            console.error('Error during login:', error);
            this.isAuthenticated$.next(false);
            throw error;
        }
    }

    public isAuthenticated(): boolean {
        return this.isAuthenticated$.getValue();
    }

    public get accountValue() {
        return this.accountSubject.value;
    }

    public get isAuthenticatedValue() {
        return this.accessToken$.value;
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
        localStorage.removeItem('token');
        localStorage.removeItem('account');
        this.accountSubject.next(null);
        this.router.navigate(['/auth/login']);
    }

    checkTokenValidity(): Observable<checkToken> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });

        return this.http.get<checkToken>(`${baseUrl}/facebook/checkToken`, { headers })
            .pipe(
                map(valid => {
                    // store account and token in local storage to keep user logged in between page refreshes
                    return valid;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }
}