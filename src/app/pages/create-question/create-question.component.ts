import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import Question from 'src/app/models/question';
import { AccountService } from 'src/app/services/account.service';
import { QuestionService } from 'src/app/services/question.service';
import {MatChipInputEvent} from '@angular/material/chips';
import Tag from 'src/app/models/tag';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { TagService } from 'src/app/services/tag.service';


@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  createMSG: string | boolean;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private questionService: QuestionService,private router: Router, private tagService: TagService) { 
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      //add value to tags if unique
      if(this.tags.indexOf(value) === -1){
        this.tags.push(value);
      }
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    //remove tag from tags
    const index = this.tags.indexOf(tag,0);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }


  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    
    this.loading = true;

    const question = new Question();
    question.content = this.form.value.content;
    question.title = this.form.value.title;
    
    this.questionService.addQuestion(question).pipe(first()).subscribe(
      (res) => {
        this.tags.forEach(async tag => {
          await this.tagService.addQuestionTag(new Tag({tag: tag}), new Question({questionId: res.questionId})).catch(err => console.log(err));
        });
        this.router.navigate(['/home']);
    });
  }

}
