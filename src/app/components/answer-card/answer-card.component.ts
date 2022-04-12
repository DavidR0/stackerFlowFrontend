import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import Answer from 'src/app/models/answer';
import User from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss']
})
export class AnswerCardComponent implements OnInit {

  @Input() answer: Answer;

  user: User;
  votedUp : boolean = false;
  votedDown : boolean = false;
  
  constructor(private voteService: VoteService, private accountService: AccountService) { 
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    //if user voted on answer, set votedUp/Down to true
    if (this.answer.votes != undefined) {
      this.answer.votes.forEach(v => {
        if (v.userId === this.user.userId) {
          if (v.voteType === 'up') {
            this.votedUp = true;
          }
          else if (v.voteType === 'down') {
            this.votedDown = true;
          }
        }
      });
    }
  }

  async voteUp() {
    //increment question score if votedUp is false else decrease the score
    if (!this.votedUp) {
      this.answer.voteCount++;
      await firstValueFrom(this.voteService.addVote('up', this.answer));
    } else {
      this.answer.voteCount--;
      await firstValueFrom(this.voteService.deleteVote('up',this.answer));
    }
    this.votedUp = !this.votedUp;
  }

  async voteDown() {
    //decrement question voteCount if votedDown is false else increase the score
    if (!this.votedDown) {
      this.answer.voteCount--;
      await firstValueFrom(this.voteService.addVote('down', this.answer));
    } else {
      this.answer.voteCount++;
      await firstValueFrom(this.voteService.deleteVote('down',this.answer));
    }
    this.votedDown = !this.votedDown;
  }

}
