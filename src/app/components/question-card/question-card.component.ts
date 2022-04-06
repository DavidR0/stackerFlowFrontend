import {Component, Input, OnInit } from '@angular/core';
import Question from 'src/app/models/question';
import Tag from 'src/app/models/tag';
import User from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() question : Question;
  @Input() questionView: boolean;
  private user : User;
 
  constructor(private accountService: AccountService) { 
    this.user = accountService.userValue;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  }

}
