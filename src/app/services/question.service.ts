import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Question from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions(){
    return this.http.get<Question[]>(`${environment.apiUrl}/api/question/getAll`);
  }

  addQuestion(question: Question){
    return this.http.post<Question>(`${environment.apiUrl}/api/question/create`, question);
  }
}
