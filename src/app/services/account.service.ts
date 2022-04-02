import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor() { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username : string, password: string) {
    let user = new User;
    user.password = password;
    user.username = username;

    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);

    return user;
  }

  logout() {
    // remove user from local storage and set current user to empty
    localStorage.removeItem('user');
    this.userSubject.next(new User);
}

}
