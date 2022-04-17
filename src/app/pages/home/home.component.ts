import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom} from 'rxjs';
import Question from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  questions: Question[];
  questionSubject: BehaviorSubject<Question[]>;
  
  constructor(private questionService: QuestionService, private router: Router) {
    this.questionSubject = new BehaviorSubject<Question[]>(this.questions);
   }

  async ngOnInit(): Promise<void> {
    this.questions = await firstValueFrom(this.questionService.getQuestions());
    this.questionSubject.next(this.questions);
  }

  onAddQuestion(){
    this.router.navigate(['/createQuestion']);
  }
}
