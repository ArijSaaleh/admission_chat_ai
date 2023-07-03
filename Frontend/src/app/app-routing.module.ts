import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './landing/home/home.component';
import { AboutUsComponent } from './landing/about-us/about-us.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { MainComponent } from './interview/main/main.component';
import { AuthGuard } from './services/auth.guard';
import { InterviewResultComponent } from './interview/interview-result/interview-result.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, },
  { path: 'interview', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutUsComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'result/:userId', component: InterviewResultComponent  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
