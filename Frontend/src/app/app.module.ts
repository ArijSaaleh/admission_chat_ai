import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationModule } from './authentication/authentication.module';
import { LandingModule } from './landing/landing.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InterviewModule } from './interview/interview.module';
import { FormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    LandingModule,
    HttpClientModule,
    FormsModule,
    InterviewModule,
    AdminModule
  ],
  exports:[
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
