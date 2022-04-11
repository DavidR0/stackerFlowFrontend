import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import Question from 'src/app/models/question';
import Tag from 'src/app/models/tag';
import Vote from 'src/app/models/vote';
import { QuestionService } from 'src/app/services/question.service';
import { TagService } from 'src/app/services/tag.service';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  questions: Question[];
  questionSubject: BehaviorSubject<Question[]>;
  tags: Tag[];
  votes: Vote[];
  constructor(private questionService: QuestionService, private tagService: TagService, private voteService: VoteService, private router: Router) {
    this.questionSubject = new BehaviorSubject<Question[]>(this.questions);
   }

  async ngOnInit(): Promise<void> {
    this.questions = await firstValueFrom(this.questionService.getQuestions());
    this.tags = await firstValueFrom(this.tagService.getQuestionTags());
    this.votes = await firstValueFrom(this.voteService.getVotes());


    //filter tags by question id and add to question
    this.questions.forEach(q => {
      return q.tags = this.tags.filter(t => t.questionId === q.questionId);
    });

    //filter votes by question id and add to question
    this.questions.forEach(q => {
      return q.votes = this.votes.filter(v => v.itemId == q.questionId && v.itemType === 'question');
    });  

    this.questionSubject.next(this.questions);
  }

  onAddQuestion(){
    this.router.navigate(['/createQuestion']);
  }
}
