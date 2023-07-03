import { Component } from '@angular/core';
import { InterviewService } from 'src/app/services/interview.service';
import { Interview } from 'src/app/model/interview.model';
import { LoginService } from 'src/app/services/login.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  interviews: { candidatName: string, submitted: string, DateSubmission: string }[] = [];
  username!: string
  constructor(private interviewService: InterviewService, private loginService: LoginService, private router: Router) {

  }
  ngOnInit() {
    this.getInterviews();
  }
  logout(): void {
    this.loginService.logout().subscribe(
      (response) => {
        console.log('Logout successful');
        localStorage.removeItem('token');
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        this.router.navigate(['home']);
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }
  getInterviews() {
    this.interviewService.getInterviews()
      .subscribe(
        (interviews: Interview[]) => {
          console.log(interviews)
          interviews.forEach((intObj: any) => {
            const candidatId = intObj.candidate._id
            const submitted = intObj.submitted
            const DateSubmission = intObj.createdAt
            this.loginService.getUsername(candidatId).toPromise().then(
              candidatName => {
                if (candidatName) {
                  this.interviews.push({ candidatName, submitted, DateSubmission })

                } else {
                  console.error("candidt name is undefined")
                }
              }
            ).catch(error => {
              console.error('error retrieving name')
            })

          });
        },
        (error) => {
          console.error('Error fetching interviews:', error);
        }
      );
  }
  
}
