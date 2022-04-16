import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Answer from '../models/answer';
import Question from '../models/question';
import User from '../models/user';
import Vote from '../models/vote';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  constructor(private accountService: AccountService, private http: HttpClient) { }

  getVotes(vote: Vote) {
    return this.http.post<Vote[]>(`${environment.apiUrl}/api/vote/getAll`, {
      ...vote
    });
  }

  isQuestion(item: Question | Answer): item is Answer {
    return (<Answer>item).answerId !== undefined;
  }

  addVote(type: "up" | "down", item: Question | Answer) {
    //voteType, itemType, itemId
    if (!this.isQuestion(item)) {
      return this.http.post<Vote>(`${environment.apiUrl}/api/vote/create`, 
      { 
        voteType: type, 
        itemType: 'question', 
        itemId: item.questionId.toString()
      });

    } else {
      return this.http.post<Vote>(`${environment.apiUrl}/api/vote/create`, 
      { 
        voteType: type, 
        itemType: 'answer', 
        itemId: item.answerId 
      });
    }
  }

  deleteVote(type: "up" | "down", item: Question | Answer) {
    const user: User = this.accountService.userValue;
    if(!this.isQuestion(item)){

      return this.http.request<Vote>('delete',`${environment.apiUrl}/api/vote/delete/`, 
      {
        body: { 
          voteType: type, 
          itemType: 'question', 
          itemId: item.questionId.toString()
        }
      });
    }
    else{
      return this.http.request<Vote>('delete',`${environment.apiUrl}/api/vote/delete/`, 
      {
        body: { 
          voteType: type, 
          itemType: 'answer', 
          itemId: item.answerId 
        }
      });
    }
  }

}
