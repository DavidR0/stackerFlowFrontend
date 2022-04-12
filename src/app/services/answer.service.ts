import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Answer from '../models/answer';
import Question from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

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
