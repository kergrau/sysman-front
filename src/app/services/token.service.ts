import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  TOKEN_REQUEST: string = 'token';
  constructor() {}

  hasToken(): boolean {
    return (
      this.getToken() != undefined &&
      this.getToken() != null &&
      this.validateExpiration()
    );
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_REQUEST);
  }

  /** It validates the expiration of token request */
  validateExpiration(): boolean {
    const obj = this.parseJwt(this.getToken());

    if (obj && obj.exp) {
      const currentDate: Date = new Date();
      return currentDate.getDate() < obj.exp;
    }
    return false;
  }

  parseJwt(token: string | null) {
    if (token) {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(
        decodeURIComponent(encodeURIComponent(window.atob(base64)))
      );
    }
  }

  hasRole(role: string) {
    const obj = this.parseJwt(this.getToken());
    let roles: string[];
    if (obj && obj.roles) {
      roles = obj.roles;
      return roles.includes(role);
    }
    return false;
  }

  getUsername() {
    const obj = this.parseJwt(this.getToken());
    return obj.sub;
  }
}
