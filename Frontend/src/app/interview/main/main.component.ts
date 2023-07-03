import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  isCameraOn = false;
  isCameraAuthorized = false;
  videoStream: MediaStream | undefined;
  constructor(private loginService: LoginService, private router: Router) { }

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
  handleVideoStream(stream: MediaStream): void {
    this.videoStream = stream;
    this.videoElement.nativeElement.srcObject = this.videoStream;
    this.videoElement.nativeElement.play();
  }
  toggleCamera(): void {
    if (this.isCameraAuthorized) {
      if (this.isCameraOn) {
        this.stopCamera();
      } else {
        this.startCamera();
      }
    } else {
      this.requestCameraAuthorization();
    }
  }

  private startCamera(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.isCameraOn = true;
        this.videoElement.nativeElement.srcObject = stream;
        this.videoElement.nativeElement.play();
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });
  }

  private stopCamera(): void {
    const videoStream = this.videoElement.nativeElement.srcObject as MediaStream;
    const videoTracks = videoStream?.getVideoTracks();

    if (videoTracks && videoTracks.length > 0) {
      videoTracks[0].stop();
    }

    this.isCameraOn = false;
  }

  private requestCameraAuthorization(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.isCameraAuthorized = true;
        this.videoElement.nativeElement.srcObject = stream;
        this.startCamera();
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });
  }
}
