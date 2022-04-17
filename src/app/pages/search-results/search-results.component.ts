import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import Question from 'src/app/models/question';
import Tag from 'src/app/models/tag';
import { QuestionService } from 'src/app/services/question.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchQuery: string;
  questions: Question[];
  tags: Tag[];
  questionSubject: BehaviorSubject<Question[]>;


  constructor(private router: Router,private questionService: QuestionService, private route: ActivatedRoute, private tagService: TagService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.questionSubject = new BehaviorSubject<Question[]>(this.questions);
      this.searchQuery = route.snapshot.params['query'];
  }

  async ngOnInit(): Promise<void> {
    //get questions
    this.questions = await firstValueFrom(this.questionService.getQuestions());
    //get tags
    this.tags = await firstValueFrom(this.tagService.getQuestionTags(new Tag));
    //add tags to questions
    this.questions.forEach(question => {
      question.tags = this.tags.filter(tag => tag.questionId == question.questionId);
    });

    //split search query into words, Made a regex that does this, but it's not working (\[(?<tag>.*?)\])||(?<keywords>[^]\s]+(?![^[]*\]))
    let searchWords = this.searchQuery.split(' ');
    const words: string[] = [];
    const tags: string[] = [];
    //filter search words into words and tags
    searchWords.forEach(word => {
      if(word.startsWith('[')){
        //remove brackets from tag add to tags array
        tags.push(word.replace(/[\[\]]/g, ''));
      } else {
        words.push(word);
      }
    });

    //filter questions by search query
    this.questions = this.questions.filter(question => {
      let questionTags = question.tags.map(tag => tag.tag.toLowerCase());

      let matchwords = false;
      let matchtags = false;
      
      //check if any of the words in the question match the search words
      words.forEach(word => {
        if(question.title.toLowerCase().includes(word.toLowerCase())){
          matchwords = true;
        }
      });
      //check if any of the tags in the question match the search tags
      tags.forEach(tag => {
        if(questionTags.includes(tag.toLowerCase())){
          matchtags = true;
        }
      });

      return matchwords || matchtags;
    });

    this.questionSubject.next(this.questions);
  }

}
