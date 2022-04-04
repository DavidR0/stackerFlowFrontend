import { Component, Input, OnInit } from '@angular/core';
import Question from 'src/app/models/question';

@Component({
  selector: 'question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() question : Question;

  constructor() { }

  ngOnInit(): void {
    // this.question.author
  }

}
