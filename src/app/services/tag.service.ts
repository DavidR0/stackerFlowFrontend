import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first,  firstValueFrom,  pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import Question from '../models/question';
import Tag from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  
  constructor(private http: HttpClient) { }

  getQuestionTags(tag: Tag) {
    return this.http.post<Tag[]>(`${environment.apiUrl}/api/qTag/getQTs`, tag);
  }

  async addQuestionTag(tag: Tag, question: Question) {
    //create tag
    const res = await firstValueFrom(this.http.post<Tag>(`${environment.apiUrl}/api/tag/create`, {tag: tag.tag }));
    tag.tagId = res.tagId;
    return await firstValueFrom(this.http.post<{questionId:number, qtagId:number}>(`${environment.apiUrl}/api/qTag/create`, { tagId: tag.tagId, questionId: question.questionId }));
  }

  deleteQuestionTag(tag: Tag) {
    return this.http.request<Tag>('delete',`${environment.apiUrl}/api/qTag/delete/`,{
      body:{
        id: tag.qtagId,
      }
    });
  }

}
