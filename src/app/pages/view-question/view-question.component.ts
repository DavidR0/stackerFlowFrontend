import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import Answer from 'src/app/models/answer';
import Question from 'src/app/models/question';
import Vote from 'src/app/models/vote';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from 'src/app/services/question.service';

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


  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
    private answerService: AnswerService, private questionService: QuestionService,private router: Router) {

    this.answerSubject = new BehaviorSubject<Answer[]>(this.answers);
    this.question = new Question();
    this.question.questionId = this.route.snapshot.params['id'];
  }

  async ngOnInit() {

    this.form = this.formBuilder.group({
      content: ['', Validators.required],
    });

    //Get the question
    await firstValueFrom(this.questionService.getQuestion(this.question)).then(question => {
      this.question = question;
      //if question doesnt exist, redirect to home
      if(question == undefined) {
        this.router.navigate(['/home']);
      }
      return question;
    });
  

    //Get the answers for the question and sort them by vote count (descending)
    this.answers = await firstValueFrom(this.answerService.getQuestionAnswers(this.question));
    this.answers.sort((a, b) => b.voteCount - a.voteCount);
    //Update the UI with the answers
    this.answerSubject.next(this.answers);
  }

  get f() { return this.form.controls; }

  //Create a new answer to question
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
      async () => {
        this.answers = await firstValueFrom(this.answerService.getQuestionAnswers(new Question({ questionId: this.question.questionId })));
        this.answers.sort((a, b) => b.voteCount - a.voteCount);
        this.loading = false;
        this.submitted = false;
        this.form.reset();

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
