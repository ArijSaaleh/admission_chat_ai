import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:8000/api/q'; 

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/questions`);
  }
  // Get question text by ID
  getQuestionTextById(questionId: string): Observable<string> {
    const url = `${this.apiUrl}/question/${questionId}`;
    return this.http.get<{ questionText: string }>(url)
      .pipe(
        map(response => response.questionText)
      );
  }
}
