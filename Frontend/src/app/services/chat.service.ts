import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8000/api'; // Update with your backend API URL

  constructor(private http: HttpClient) { }

  sendUserMessage(intent: string) {
    const body = { intent: intent };
    return this.http.post<any>(this.apiUrl + '/chatAudio', body);
  }

  /* sendUserMessage(intent: string) {
     const body = { intent: intent };
     return this.http.post(this.apiUrl + '/chatAudio', body, {
       responseType: 'arraybuffer',
       observe: 'response'
     });
   }*/
}
