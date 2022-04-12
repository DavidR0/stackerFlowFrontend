import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import Question from 'src/app/models/question';
import User from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { VoteService } from 'src/app/services/vote.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

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
  authorScore: number = 0;

  constructor(private dataService: DataService,private accountService: AccountService, private voteService: VoteService, private router: Router) {
    this.user = this.accountService.userValue;    
  }

  async ngOnInit(): Promise<void> {
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
    //get the author's score
    if(this.question.userId === this.user.userId){
      this.authorScore = this.user.score;
    }else{
      //get the user's score
      this.authorScore = (await firstValueFrom(this.accountService.getAccount(new User({userId:this.question.userId})))).score;
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

  viewQuestion(){
    //Save the question to the data service
    this.dataService.data = this.question;
    //rote to view question page
    this.router.navigate(['/viewQuestion']);
  }

  onAuthor(){
    //rote to view question page
    this.router.navigate(['/user',this.question.userId]);
  }
}
