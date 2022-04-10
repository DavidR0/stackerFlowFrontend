import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import Question from 'src/app/models/question';
import User from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() question: Question;
  @Input() questionView: boolean;
  user: User;
  votedUp: boolean = false;
  votedDown: boolean = false;

  constructor(private accountService: AccountService, private voteService: VoteService) {
    this.user = this.accountService.userValue;
  }
  ngOnInit(): void {
    this.updateView();
  }

  private updateView(){
    //if user voted on question, set votedUp/Down to true
    if (this.question.votes != undefined) {
      this.question.votes.forEach(v => {
        if (v.userId === this.user.userId && v.itemType === 'question') {
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
      this.question.voteCount++;
      await firstValueFrom(this.voteService.addVote('up', this.question));
    } else {
      this.question.voteCount--;
      await firstValueFrom(this.voteService.deleteVote('up',this.question));
    }
    this.votedUp = !this.votedUp;
  }

  async voteDown() {
    //decrement question voteCount if votedDown is false else increase the score
    if (!this.votedDown) {
      this.question.voteCount--;
      await firstValueFrom(this.voteService.addVote('down', this.question));
    } else {
      this.question.voteCount++;
      await firstValueFrom(this.voteService.deleteVote('down',this.question));
    }
    this.votedDown = !this.votedDown;
  }

}
