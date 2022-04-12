import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import Answer from 'src/app/models/answer';
import Question from 'src/app/models/question';
import Vote from 'src/app/models/vote';
import { AnswerService } from 'src/app/services/answer.service';
import { DataService } from 'src/app/services/data.service';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss']
})
export class ViewQuestionComponent implements OnInit {
  question: Question;
  answers: Answer[];
  votes: Vote[];
  form: FormGroup;
  submitted = false;
  loading = false;
  createMSG: string | boolean;
  answerSubject: BehaviorSubject<Answer[]>;


  constructor(private formBuilder: FormBuilder,private dataService: DataService, private answerService: AnswerService, private voteService: VoteService) { 
    this.answerSubject = new BehaviorSubject<Answer[]>(this.answers);
  }

  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      content: ['', Validators.required],
    });

    this.question = this.dataService.data;
    //Get the answers for the question
    this.answers = await firstValueFrom(this.answerService.getQuestionAnswers(new Question({questionId: this.question.questionId})));
    this.votes = await firstValueFrom(this.voteService.getVotes());

    //sort answers by voteCount
    this.answers.sort((a,b) => b.voteCount - a.voteCount);

    //add votes to answers votes array from question
    this.answers.forEach(answer => {
      answer.votes = this.votes.filter(vote => vote.itemId === answer.answerId && vote.itemType === 'answer');
    });

    this.answerSubject.next(this.answers);
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.answerService.createAnswer(new Answer({
      questionId: this.question.questionId,
      content: this.f['content'].value
    })).subscribe(
      async data => {
        this.loading = false; 
        this.submitted = false;
        this.form.reset();
        this.answers = await firstValueFrom(this.answerService.getQuestionAnswers(new Question({questionId: this.question.questionId})));
        this.answers.sort((a,b) => b.voteCount - a.voteCount);

        this.answerSubject.next(this.answers);
      },
      error => {
        this.createMSG = error;
        this.loading = false;
        this.submitted = false;
      }
    );
  }
}
