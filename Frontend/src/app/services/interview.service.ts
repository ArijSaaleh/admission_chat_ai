import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interview } from '../model/interview.model';
@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private baseUrl = 'http://localhost:8000/api/admission'; 

  constructor(private http: HttpClient) {}

  startInterview(): Observable<any> {
    return this.http.post(`${this.baseUrl}/interview/start`, {},{ withCredentials: true});
  }

  submitInterview(answers:any): Observable<any> {
    const body = { answers };
    return this.http.post(`${this.baseUrl}/submit`, body, { withCredentials: true });
  }
  getInterview(userId: string): Observable<Interview> {
    const url = `${this.baseUrl}/interview/${userId}`;
    return this.http.get<Interview>(url);
  }
}
