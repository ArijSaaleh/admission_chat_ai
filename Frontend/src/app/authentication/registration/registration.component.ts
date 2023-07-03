import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm !: FormGroup;
  isAdmin: boolean = false;
  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      AdministrativeID: ['']
    });
  }
  onSubmit() {
    if (this.registrationForm.invalid) {

      // Display validation errors
      this.registrationForm.markAllAsTouched();

    }

    const username = this.registrationForm.value.username;
    const password = this.registrationForm.value.password;
    const role = this.registrationForm.value.role;
    const AdministrativeID= this.isAdmin ? this.registrationForm.value.AdministrativeID : null
    console.log("aaaaa " + AdministrativeID);
    this.registrationService.registerUser(username, password, role, AdministrativeID).subscribe(

      response => {
        // Handle successful registration response

        console.log('Registration successful:', response);
        // Reset the form
        this.registrationForm.reset();
        // Redirect to the login page
        this.router.navigate(['/login']);
      },
      error => {
        // Handle registration error
        console.error('Registration failed:', error);
        console.log(error)
      }
    );

  }
  onRoleChange() {
    this.isAdmin = this.registrationForm.value.role === 'admin';
  }
}
