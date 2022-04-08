import { Component, Input, OnInit } from '@angular/core';
import Question from 'src/app/models/question';
import User from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

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

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    //if user voted on question, set votedUp/Down to true
    if (this.question.votes) {
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

  ngAfterViewInit() {
  }

  voteUp() {
    //increment question score if votedUp is false else decrease the score
    if (!this.votedUp) {
      this.question.voteCount++;
      //TODO: add vote with vote service

    } else {
      this.question.voteCount--;
      //TODO: delete vote with vote service

    }
    this.votedUp = !this.votedUp;
    //TODO: add vote with vote service
  }

  voteDown() {
    //decrement question voteCount if votedDown is false else increase the score
    if (!this.votedDown) {
      this.question.voteCount--;
      //TODO: add vote with vote service

    } else {
      this.question.voteCount++;
      //TODO: delete vote with vote service

    }
    this.votedDown = !this.votedDown;
  }

}
