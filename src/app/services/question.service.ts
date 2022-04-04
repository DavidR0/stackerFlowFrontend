import { Injectable } from '@angular/core';
import Question from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  getQuestions(){
    let questions : Question[]=[
      new Question(),
      new Question(),
      new Question()
    ];

    questions[0].author = "Van"
    questions[0].content = "what is a van"
    questions[0].title = "Van"
    questions[0].voteCount = 100;
    questions[0].userid = 1;

    questions[1].author = "Bird"
    questions[1].content = "what is a bird"
    questions[1].title = "Bird?"
    questions[1].voteCount = 10;
    questions[1].userid = 2;

    questions[2].author = "Star"
    questions[2].content = "what is a star"
    questions[2].title = "STAR!"
    questions[2].voteCount = 56;
    questions[2].userid = 3;

    return questions;
  }
}
