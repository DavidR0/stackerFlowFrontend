import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Question from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  updateQuestion(question: Question){
    return this.http.patch<Question>(`${environment.apiUrl}/api/question/update`, question);
  }

  constructor(private http: HttpClient) { }

  getQuestions(){
    return this.http.get<Question[]>(`${environment.apiUrl}/api/question/getAll`);
  }

  getQuestion(question: Question){
    return this.http.request<Question>('post',`${environment.apiUrl}/api/question/get`, { body: { questionId: question.questionId } });
  }

  addQuestion(question: Question){
    return this.http.post<Question>(`${environment.apiUrl}/api/question/create`, question);
  }
}
