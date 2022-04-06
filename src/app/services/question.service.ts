import { Injectable } from '@angular/core';
import Question from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  getQuestions(){
    //TODO replace with api call to get questions
    let questions = [
      {
          "questionId": 5,
          "userId": 30,
          "author": "test2",
          "title": "My title u2",
          "content": "this is my question u2",
          "creationTime": "2022-03-14T21:43:17.000Z",
          "voteCount": 0
      },
      {
          "questionId": 4,
          "userId": 28,
          "author": "test",
          "title": "New title",
          "content": "this is my question",
          "creationTime": "2022-03-13T17:27:30.000Z",
          "voteCount": 1
      },
      {
          "questionId": 7,
          "userId": 28,
          "author": "test",
          "title": "clone",
          "content": "this is my question",
          "creationTime": "2022-03-13T17:27:30.000Z",
          "voteCount": 1
      }
  ];

    //Map to Question model and sort by creation time
    return questions.map(q => new Question(q)).sort((a, b) => {
      return new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime();
    }); 
  }

}
