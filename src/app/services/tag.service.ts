import { Injectable } from '@angular/core';
import Question from '../models/question';
import Tag from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  
  constructor() { }

  getTags() {}
  addTag(tag: Tag) {}
  deleteTag(tag: Tag) {}
  addTagToQuestion(tag: Tag, question: Question) {}

  getQuestionTags() {
    const tags = [
      {
          "tagId": 1,
          "questionId": 4,
          "qtagId": 2,
          "tag": "TS"
      },
      {
          "tagId": 1,
          "questionId": 4,
          "qtagId": 3,
          "tag": "TS"
      },
      {
          "tagId": 8,
          "questionId": 4,
          "qtagId": 4,
          "tag": "JSDemo"
      },
      {
          "tagId": 1,
          "questionId": 4,
          "qtagId": 6,
          "tag": "TS"
      },
      {
          "tagId": 1,
          "questionId": 5,
          "qtagId": 7,
          "tag": "TS"
      },
      {
          "tagId": 5,
          "questionId": 5,
          "qtagId": 9,
          "tag": "JS"
      }
  ];
    // map to tag model
    return tags.map(t => new Tag(t));
  }
}
