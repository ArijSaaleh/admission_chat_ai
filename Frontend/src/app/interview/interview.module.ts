import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { AuthenticationModule } from '../authentication/authentication.module';
import { InterviewContentComponent } from './interview-content/interview-content.component';
import { InterviewResultComponent } from './interview-result/interview-result.component';
import { LandingModule } from '../landing/landing.module';

@NgModule({
  declarations: [
    MainComponent,
    InterviewContentComponent,
    InterviewResultComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationModule,
    LandingModule
  ],
  exports: [
    MainComponent
  ]
})
export class InterviewModule { }
