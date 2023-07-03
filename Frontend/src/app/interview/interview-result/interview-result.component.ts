import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterviewService } from 'src/app/services/interview.service';
import { Interview } from 'src/app/model/interview.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-interview-result',
  templateUrl: './interview-result.component.html',
  styleUrls: ['./interview-result.component.css']
})
export class InterviewResultComponent implements OnInit {
  userId: string = '';
  interview!: Interview;
  answers: { questionText: string; answer: string; }[] = [];

  constructor(
    private route: ActivatedRoute,
    private interviewService: InterviewService,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId') || 'none';
    this.getInterviewAnswers();
  }

  getInterviewAnswers(): void {
    this.interviewService.getInterview(this.userId).subscribe(
      (interview: Interview) => {
        this.interview = interview;
        console.log(this.interview);
        // Accessing questions array
        const questions = interview.questions;
        // Accessing question and answer properties
        questions.forEach((questionObj: any) => {
          const questionId = questionObj.question._id;
          const answer = questionObj.answer;
          console.log('Question:', questionId);
          console.log('Answer:', answer);
          this.questionService.getQuestionTextById(questionId).toPromise()
            .then(questionText => {
              if (questionText) {
                // Map question text and answer to each question
                this.answers.push({ questionText, answer });
              } else {
                console.error(`Question text is undefined for question ID ${questionId}`);
              }
            })
            .catch(error => {
              console.error(`Error retrieving question text for question ID ${questionId}:`, error);
            });
        });
      },
      (error) => {
        console.error('Error retrieving interview answers:', error);
      }
    );
  }
}
