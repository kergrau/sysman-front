import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/login-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authRoute: string = `${environment.urlBase}/auth`;
  constructor(private http: HttpClient) {}

  signIn(params: LoginRequest): Observable<any> {
    return this.http.post(`${this.authRoute}/signin`, params);
  }

  signUp(params: any): Observable<any> {
    return this.http.post(`${this.authRoute}/signup`, params);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.authRoute}/logout`, {});
  }
}
