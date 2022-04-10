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

  getVotes() {
    return this.http.get<Vote[]>(`${environment.apiUrl}/api/vote/getAll`);
  }

  addVote(type : "up" | "down", item : Question | Answer){
  //   //TODO replace with api call to vote question
  //   if(type === "up"){
  //     this.questions.find(q => q.questionId === question.questionId)!.voteCount++;
  //   }else{
  //     this.questions.find(q => q.questionId === question.questionId)!.voteCount--;
  //   }
  }

  removeVote(type : "up" | "down", item : Question | Answer){
    const user: User = this.accountService.userValue;
    //use the userId and item id to find the vote and remove it
  }

}
