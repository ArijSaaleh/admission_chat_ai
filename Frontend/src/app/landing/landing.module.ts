import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavlandComponent } from './navland/navland.component';
import { FootlandComponent } from './footland/footland.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavlandComponent,
    FootlandComponent,
    HomeComponent,
    AboutUsComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    
  ],
  exports: [
    NavlandComponent,
    FootlandComponent,
    HomeComponent,
    AboutUsComponent,
    ChatComponent
  ]
})
export class LandingModule { }
