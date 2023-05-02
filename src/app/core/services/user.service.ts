import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class CreateService {
    private apiUrl = `${environment.apiUrl}/user`;

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.get<User[]>(`${this.apiUrl}`, { headers });
    }

    createUser(user: User) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.post<User>(`${this.apiUrl}/create`, user, { headers })
            .pipe(
                map(user => {
                    // store account and token in local storage to keep user logged in between page refreshes
                    return user;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    updateUser(user: User): Observable<User> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.put<User>(`${this.apiUrl}/${user.id}`, user, { headers });
    }

    deleteUser(id: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.delete(`${this.apiUrl}/${id}`, { headers });
    }
}
