import { Injectable } from '@angular/core';
import Question from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public data : Question;
  constructor() { }
}
