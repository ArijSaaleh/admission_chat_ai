import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.loginService.checkAuthentication().pipe(
          tap((isAuthenticated) => {
            if (!isAuthenticated) {
              this.router.navigate(['/login']);
            }
          })
        );
      }
}
