import { Component, OnInit } from '@angular/core';
import Question from 'src/app/models/question';
import Tag from 'src/app/models/tag';
import { QuestionService } from 'src/app/services/question.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  questions: Question[];
  tags: Tag[];
  constructor(private questionService: QuestionService, private tagService: TagService) { }

  ngOnInit(): void {
    this.questions = this.questionService.getQuestions();  
    this.tags = this.tagService.getQuestionTags();
    //filter tags by question id and add to question
    this.questions.forEach(q => {
      console.log(q);
      return q.tags = this.tags.filter(t => t.questionId === q.questionId);
    });
  }

  onAddQuestion(){
    console.log("Add question");
  }
}
