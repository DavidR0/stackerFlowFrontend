import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import Question from 'src/app/models/question';
import User from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { VoteService } from 'src/app/services/vote.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { QuestionService } from 'src/app/services/question.service';
import { TagService } from 'src/app/services/tag.service';
import Tag from 'src/app/models/tag';
import Vote from 'src/app/models/vote';


@Component({
  selector: 'question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit, OnChanges {

  @Input() question: Question;
  @Input() questionView: boolean;
  user: User;
  votedUp: boolean = false;
  votedDown: boolean = false;
  editing: boolean = false;
  authorScore: number = 0;

  form: FormGroup;
  submitted = false;
  loading = false;
  createMSG: string | boolean;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];


  constructor(private formBuilder: FormBuilder,private accountService: AccountService, 
    private voteService: VoteService,private questionService: QuestionService, private tagService: TagService ,private router: Router) {
    this.user = this.accountService.userValue;
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.form = this.formBuilder.group({
      title: [this.question.title, Validators.required],
      content: [this.question.content, Validators.required],
    });

    if(this.question.userId != undefined){
      //get the author's score
      this.authorScore = (await firstValueFrom(this.accountService.getAccount(new User({ userId: this.question.userId })))).score;
    }
  }

  async ngOnInit(): Promise<void> {
    //get question votes
    await firstValueFrom(this.voteService.getVotes(new Vote({ itemId: this.question.questionId,itemType: "question" }))).then(votes => {
        //if user voted on question, set votedUp/Down to true
        votes.forEach(vote => {
          if (vote.userId === this.user.userId) {
            if (vote.voteType === 'up') {
              this.votedUp = true;
            } else {
              this.votedDown = true;
            }
          }
        });
      });

    //get question tags
    this.tagService.getQuestionTags(new Tag({questionId : this.question.questionId})).subscribe(
      (tags: Tag[]) => {
        this.question.tags = tags;
        //add tags to tags array
        tags.forEach(tag => {
          this.tags.push(tag.tag);
        });
      }
    );
  }  

  get f() { return this.form.controls; }

  async voteUp() {
    //increment question score if votedUp is false else decrease the score
    if (!this.votedUp) {
      this.question.voteCount++;
      await firstValueFrom(this.voteService.addVote('up', this.question));
    } else {
      this.question.voteCount--;
      await firstValueFrom(this.voteService.deleteVote('up', this.question));
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
      await firstValueFrom(this.voteService.deleteVote('down', this.question));
    }
    this.votedDown = !this.votedDown;
  }

  viewQuestion() {
    //rote to view question page
    this.router.navigate(['/viewQuestion', this.question.questionId]);
  }

  onAuthor() {
    //rote to view question page
    this.router.navigate(['/user', this.question.userId]);
  }

  onEdit() {
    this.editing = !this.editing;
  }

  onDelete() {
    //delete question
    this.questionService.deleteQuestion(this.question).subscribe(
      (res) => {
        this.router.navigate(['/home']);
      },
      (err) => {
        this.createMSG = err;
      }
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      //add value to tags if unique
      if (this.tags.indexOf(value) === -1) {
        this.tags.push(value);
      }
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    //remove tag from tags
    const index = this.tags.indexOf(tag, 0);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  //Update question
  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;


    //update question in database
    this.questionService.updateQuestion(new Question({
      questionId: this.question.questionId,
      title: this.form.value.title,
      content: this.form.value.content,
    })).subscribe(
      () => {
        //update view question
        this.question.title = this.form.value.title;
        this.question.content = this.form.value.content;

        //remove all the tags in question tags that arent in tags array, handles case where exisitng tags are deleted
        this.question.tags.forEach(async tag => {
          if (this.tags.indexOf(tag.tag) === -1) {
            await firstValueFrom(this.tagService.deleteQuestionTag(tag));
            this.question.tags.splice(this.question.tags.indexOf(tag), 1);
          }
        });

        //handles case where the tags were not modified and new ones were added
        this.tags.forEach(async tag => {
          if (this.question.tags.find(t => t.tag === tag) === undefined) {
            const rez = await this.tagService.addQuestionTag(new Tag({tag: tag}), this.question);
            this.question.tags.push(new Tag({qtagId:rez.qtagId, tag: tag, questionId: this.question.questionId }));
          }
        });
        

        this.editing = false;
        this.loading = false;
        this.submitted = false;
      },
      error => {
        this.createMSG = error;
        this.editing = false;
        this.loading = false;
        this.submitted = false;
      }
    );
  }
}
