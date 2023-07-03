import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-navland',
  templateUrl: './navland.component.html',
  styleUrls: ['./navland.component.css']
})
export class NavlandComponent {
  constructor(private loginService: LoginService, private router:Router) { }
  isLoggedIn = false;
  ngOnInit() {
    this.loginService.isAuthenticated().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
  
    // Check authentication status on component initialization
    this.loginService.checkAuthentication().subscribe();
  }
  logout(): void {
    this.loginService.logout().subscribe(
      (response) => {
        console.log(response)
        // Logout successful
        // Clear the token from local storage or cookies
        localStorage.removeItem('token'); // Remove from local storage
        // Clear the cookie containing the token
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Redirect the user to the home page
        // Replace 'home' with the actual route for the home page
        this.router.navigate(['home']);
      },
      (error) => {
        // Logout failed
        console.error(error);
      }
    );
  }
}
