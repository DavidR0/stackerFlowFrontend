import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
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
  tags: Tag[];
  votes: Vote[];
  constructor(private questionService: QuestionService, private tagService: TagService, private voteService: VoteService) { }

  ngOnInit(): void {
    this.questionService.getQuestions().pipe(first()).subscribe(q => {
      this.questions = q;

      this.tags = this.tagService.getQuestionTags();
      this.votes = this.voteService.getVotes();
      //filter tags by question id and add to question
      this.questions.forEach(q => {
        return q.tags = this.tags.filter(t => t.questionId === q.questionId);
      });
  
      //filter votes by question id and add to question
      this.questions.forEach(q => {
        return q.votes = this.votes.filter(v => v.itemId === q.questionId && v.itemType === 'question');
      });  
    });
  }

  onAddQuestion(){
    console.log("Add question");
  }
}
