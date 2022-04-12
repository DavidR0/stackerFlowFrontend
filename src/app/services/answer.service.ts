import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Answer from '../models/answer';
import Question from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  deleteAnswer(answer: Answer) {
    return this.http.request<Answer>('delete',`${environment.apiUrl}/api/answer/delete`, {body: { ...answer }}
    );
  }

  updateAnswer(answer: Answer) {
    return this.http.patch<Answer>(`${environment.apiUrl}/api/answer/update`,
      { ...answer }
    );
  }

  createAnswer(answer: Answer) {
    return this.http.post<Answer>(`${environment.apiUrl}/api/answer/create`,
      { ...answer }
    );
  }

  constructor(private http: HttpClient) { }

  getQuestionAnswers(question: Question) {
    return this.http.post<Answer[]>(`${environment.apiUrl}/api/answer/getQuestionAnswers`,
      { questionId: question.questionId }
    );
  }
}
