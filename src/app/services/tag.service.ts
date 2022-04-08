import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Question from '../models/question';
import Tag from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  
  constructor(private http: HttpClient) { }

  getTags() {}
  addTag(tag: Tag) {}
  deleteTag(tag: Tag) {}
  addTagToQuestion(tag: Tag, question: Question) {}

  getQuestionTags() {
    return this.http.get<Tag[]>(`${environment.apiUrl}/api/qTag/getQTs`);
  }
}
