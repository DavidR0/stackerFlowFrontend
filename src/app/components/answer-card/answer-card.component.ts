import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import Answer from 'src/app/models/answer';
import User from 'src/app/models/user';
import Vote from 'src/app/models/vote';
import { AccountService } from 'src/app/services/account.service';
import { AnswerService } from 'src/app/services/answer.service';
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
  editing: boolean = false;
  loading: boolean = false;
  deleted: boolean = false;
  createMSG: string | boolean;
  form: FormGroup;
  submitted: boolean = false;
  authorScore: number;

  
  constructor(private router: Router, private formBuilder: FormBuilder, private voteService: VoteService, private accountService: AccountService, private answerService: AnswerService) { 
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      content: [this.answer.content, Validators.required],
    });

    //get answer author score
    this.accountService.getAccount(new User({
      userId: this.answer.userId
    })).subscribe(
      user => {
        this.authorScore = user.score;
      }
    );
  
    //get answer votes
    this.voteService.getVotes(new Vote({
      itemId: this.answer.answerId,
      itemType: 'answer'
      
    })).subscribe(
      votes => {
        votes.forEach(vote => {
          if (vote.userId === this.user.userId) {
            if (vote.voteType === 'up') {
              this.votedUp = true;
            } else if (vote.voteType === 'down') {
              this.votedDown = true;
            }
          }
        });
      }
    );

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

  onEdit(){
    this.editing = !this.editing;
  }

  onDelete() {
    this.loading = true;
    this.answerService.deleteAnswer(new Answer({answerId: this.answer.answerId})).subscribe(
      () => {
        this.loading = false;
        this.deleted = true;
      },
      error => {
        this.createMSG = error;
        this.loading = false;
      }
    );
  }

  onAuthor() {
    //rote to view question page
    this.router.navigate(['/user', this.answer.userId]);
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.answerService.updateAnswer(new Answer({
      answerId: this.answer.answerId,
      content: this.f['content'].value
    })).subscribe(
      async data => {
        this.loading = false;
        this.submitted = false;
        this.editing = false;
        this.answer.content = data.content;
      },
      error => {
        this.createMSG = error;
        this.loading = false;
      }
    );

  }

  get f() { return this.form.controls; }


}
