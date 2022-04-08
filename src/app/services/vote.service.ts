import { Injectable } from '@angular/core';
import Answer from '../models/answer';
import Question from '../models/question';
import User from '../models/user';
import Vote from '../models/vote';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private vote = [
    {
        "voteId": 1,
        "userId": 46,
        "itemId": 5,
        "voteType": "up",
        "itemType": "question"
    },
    {
        "voteId": 2,
        "userId": 46,
        "itemId": 4,
        "voteType": "down",
        "itemType": "question"
    },
    {
        "voteId": 3,
        "userId": 30,
        "itemId": 7,
        "voteType": "down",
        "itemType": "question"
    }
  ];

  constructor(private accountService: AccountService) { }

  getVotes() {
    //TODO replace with api call to get votes
    //Map to Vote model
    return this.vote.map(v => new Vote(v));
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
