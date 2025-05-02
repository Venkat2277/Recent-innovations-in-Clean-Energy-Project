import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { apiBaseUrl } from "../util/helper";

@Injectable({ providedIn: 'root' })
export class AuthService {

  // private readonly tokenKey = 'token';
  private tokenKey = 'auth-token';
  private apiUrl = apiBaseUrl + 'api/auth/login';


  constructor(private http: HttpClient, private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) { }



  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        const token = response.token;
        console.log(token)
        if (token && this.isBrowser()) {
          localStorage.setItem(this.tokenKey, token);
          localStorage.setItem("username", username);
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem("username");
    }
    this.router.navigate(['/login']);
  }
  getLoggedInUser() {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  isAuthenticated(): boolean {
    if (this.isBrowser()) {
      return !!localStorage.getItem(this.tokenKey);
    }
    return false;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
