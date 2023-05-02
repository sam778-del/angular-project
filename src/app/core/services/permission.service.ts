import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private baseUrl = `${environment.apiUrl}`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
  };

  constructor(private http: HttpClient) { }

  getAllRoles() {
    return this.http.get<any>(`${this.baseUrl}/roles`, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  getAllPermissions() {
    return this.http.get<any>(`${this.baseUrl}/permissions`, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  getActiveRolePermission(roleId: number, permissionId: number) {
    const url = `${this.baseUrl}/roles/${roleId}/permissions`;
    return this.http.get<any>(url, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  updatePermissionForRole(roleId: number, permissionId: number) {
    const body = { roleId, permissionId };
    return this.http.patch<any>(`${this.baseUrl}/roles/${roleId}/permissions/${permissionId}`, body, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  getAllPermissionsForRole(role: string) {
    const params = { role };
    return this.http.get<any>(`${this.baseUrl}/permissions`, { ...this.httpOptions, params })
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError(error);
        })
      );
  }
}
