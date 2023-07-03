import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    private apiUrl = 'http://localhost:8000/api/user';

    constructor(private http: HttpClient) { }

    registerUser(username: string, password: string, role: string, AdministrativeID: string): Observable<any> {
        const body = { username, password, role, AdministrativeID }
        if (role === 'admin') {
            body.AdministrativeID = AdministrativeID;
          }
        console.log(body)

        return this.http.post(`${this.apiUrl}/register`, body).pipe(

            catchError((error: HttpErrorResponse) => {
                if (error.status === 400) {
                    // Handle validation errors
                    const validationErrors = error.error;
                    console.log('Validation errors:', validationErrors);
                    // Display appropriate messages to the user or update the form with the error messages
                } else {
                    // Handle other types of errors
                    console.error('Registration failed:', error);
                    // Display a generic error message to the user
                }
                // Throw the error to propagate it to the component
                throw error;
            })
        );
    }

}
