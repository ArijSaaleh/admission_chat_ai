import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap, of, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/api/user';
  private isAuthenticate = false;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body, { withCredentials: true })
      .pipe(
        tap(() => {
          this.isAuthenticate = true;
          this.isAuthenticatedSubject.next(true);
        })
      );
  }
 
getUsername(userId: string): Observable<string> {
  const url = `${this.apiUrl}/username/${userId}`;
  return this.http.get<{ username: string }>(url)
    .pipe(
      map(response => response.username)
    );
}


  getCookie(name: string): string {
    const cookies = document.cookie
    if (cookies) {
      return cookies;
    }
    return '';
  }
  isLoggedIn(): boolean {
    return this.isAuthenticate;
  }
  logout(): Observable<any> {
    const httpOptions = {
      withCredentials: true // Include cookies in the request
    };

    return this.http.post<any>(`${this.apiUrl}/logout`, {}, httpOptions)
      .pipe(
        tap(() => {
          this.isAuthenticate = false;
          this.isAuthenticatedSubject.next(false);
        }),
        catchError((error: any) => {
          console.error('Logout error:', error);
          return throwError(error);
        })
      );
  }
  checkAuthentication(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/protected`, { withCredentials: true })
      .pipe(
        catchError(() => of(false)),
        tap((isAuthenticated) => {
          this.isAuthenticatedSubject.next(isAuthenticated);
        })
      );
  }
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

}
