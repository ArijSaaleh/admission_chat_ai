import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.loginService.login(username, password)
      .subscribe(
        response => {
          // Handle successful login response
          console.log(response);
          const token = this.loginService.getCookie('jwt');
          console.log(token)
          // Store the token in local storage
          localStorage.setItem('token', token);

          if (response.user.role == 'candidate') {
            console.log(response.user.role)
            this.router.navigate(['/interview']);
          } else {
            this.router.navigate(['/admin']);
          }

        },
        error => {
          // Handle login error
          console.log(error);
        }
      );
    // Reset the form
    this.loginForm.reset();
  }
}
