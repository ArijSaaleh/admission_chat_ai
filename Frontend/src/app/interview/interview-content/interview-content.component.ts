import { Component, ViewChild, EventEmitter, Output} from '@angular/core';
import { MainComponent } from '../main/main.component';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/model/question.model';
import { InterviewService } from 'src/app/services/interview.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interview-content',
  templateUrl: './interview-content.component.html',
  styleUrls: ['./interview-content.component.css']
})
export class InterviewContentComponent {
  
  isInterviewStarted = false;
  currentQuestionIndex = 0;
  userResponses: string[] = [];
  questions: Question[] = [];
 
  constructor(private questionService: QuestionService, private mainComponenet:MainComponent, private interviewService: InterviewService, private router: Router) { }

  ngOnInit(): void {
    
  }

  startInterview(): void {
    this.interviewService.startInterview().subscribe(
      (response) => {
        this.questions = response.questions
        // Handle the response from the server
        console.log('Interview started:', response);
      },
      (error) => {
        // Handle errors
        console.error('Error starting interview:', error);
      }
    );
    // Request permission to access camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.mainComponenet.handleVideoStream(stream); // Call the method in the MainComponent to handle the video stream
      })
      .catch(error => {
        console.error('Error accessing video stream:', error);
      });

    this.isInterviewStarted = true;
  }

  nextQuestion(): void {
    this.currentQuestionIndex++;
  }

  isQuestionAnswered(): boolean {
    return !!this.userResponses[this.currentQuestionIndex];
  }

  submitInterview(): void {
    
    this.interviewService.submitInterview(this.userResponses).subscribe(
      (response) =>{
        const userId = response.interview.candidate;

        console.log(userId)
        console.log('interview submitted: ', response)
        this.router.navigate(['/result', userId]);

      },
      (error)=>{
        console.error('error submitting ', error)
      }
      );
    console.log('User Responses:', this.userResponses);
  }
}
