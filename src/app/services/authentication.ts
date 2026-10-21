import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { User } from '../user.model';

const API_KEY = 'AIzaSyBfeJD3AT5enT0MpttT3HZ-SZ-cC1FZsUw';
const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  user = signal<User | null>(null);
  private logoutTimer?: ReturnType<typeof setTimeout>;

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${BASE_URL}:signUp?key=${API_KEY}`, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((response) => this.handleAuthentication(response)),
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${BASE_URL}:signInWithPassword?key=${API_KEY}`, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((response) => this.handleAuthentication(response)),
      );
  }

  autoLogin() {
    const stored = localStorage.getItem('userData');
    if (!stored) {
      return;
    }

    const data: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(stored);

    const expirationDate = new Date(data._tokenExpirationDate);
    if (expirationDate <= new Date()) {
      localStorage.removeItem('userData');
      return;
    }

    const user = new User(data.email, data.id, data._token, expirationDate);
    this.user.set(user);
    this.setLogoutTimer(expirationDate.getTime() - Date.now());
  }

  get token() {
    return this.user()?.token ?? null;
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('userData');
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = undefined;
    }
  }

  isAuthenticated() {
    return this.user() !== null;
  }

  private handleAuthentication(response: AuthResponse) {
    const expirationDate = new Date(Date.now() + Number(response.expiresIn) * 1000);
    const user = new User(response.email, response.localId, response.idToken, expirationDate);

    this.user.set(user);
    this.setLogoutTimer(Number(response.expiresIn) * 1000);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        email: user.email,
        id: user.id,
        _token: response.idToken,
        _tokenExpirationDate: expirationDate.toISOString(),
      }),
    );
  }

  private setLogoutTimer(duration: number) {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = setTimeout(() => this.logout(), duration);
  }

  private handleError = (error: HttpErrorResponse) => {
    if (error.status === 0) {
      return throwError(
        () => new Error('Could not connect to the server. Check your internet connection.'),
      );
    }

    const code = error.error?.error?.message;

    switch (code) {
      case 'EMAIL_EXISTS':
        return throwError(() => new Error('This email is already registered.'));
      case 'EMAIL_NOT_FOUND':
        return throwError(() => new Error('No account found with this email.'));
      case 'INVALID_PASSWORD':
      case 'INVALID_LOGIN_CREDENTIALS':
        return throwError(() => new Error('Invalid email or password.'));
      case 'INVALID_EMAIL':
        return throwError(() => new Error('Please enter a valid email address.'));
      case 'MISSING_PASSWORD':
        return throwError(() => new Error('Please enter a password.'));
      case 'WEAK_PASSWORD : Password should be at least 6 characters':
      case 'WEAK_PASSWORD':
        return throwError(() => new Error('Password must be at least 6 characters long.'));
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return throwError(() => new Error('Too many failed attempts. Please try again later.'));
      case 'USER_DISABLED':
        return throwError(() => new Error('This account has been disabled.'));
      case 'OPERATION_NOT_ALLOWED':
        return throwError(
          () => new Error('Email/password sign-in is not enabled for this project.'),
        );
      case 'API_KEY_INVALID':
      case 'INVALID_API_KEY':
        return throwError(
          () => new Error('Invalid Firebase API key. Please check your configuration.'),
        );
      case 'SIGN_IN_PROVIDER_DISABLED':
        return throwError(() => new Error('This sign-in provider is disabled.'));
      default:
        return throwError(() => new Error(code ?? 'An unknown error occurred.'));
    }
  };
}
