import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../service/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/user/all`;

  constructor(private http: HttpClient) {}

  getUsers(page: number, pageSize: number): Observable<User[]> {
    const url = `${this.apiUrl}?page=${page}&per_page=${pageSize}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(url, { headers });
  }
}
