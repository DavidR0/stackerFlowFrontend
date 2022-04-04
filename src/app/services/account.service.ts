import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import User from '../models/user';

//TODO add API integration

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router) { 
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
  }

  logout() {
    // remove user from local storage and set current user to empty
    localStorage.removeItem('user');
    this.userSubject.next(new User);
    this.router.navigate(['/login']);
  }

  register(user: User) {
    user.id = 1;
    user.token = "Fake token"
    return user;
  }

}
