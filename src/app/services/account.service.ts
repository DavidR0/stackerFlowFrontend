import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email : string, password: string) {
    
    return this.http.post<User>(`${environment.apiUrl}/api/session/create`, { email, password })
    .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    //TODO SET SESSION AS INVALID
    // remove user from local storage and set current user to empty
    localStorage.removeItem('user');
    this.userSubject.next({} as User);
    this.router.navigate(['/login']);
  }

  register(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/api/user/create`, 
    { email:user.email, password: user.password, userName: user.userName });
  }

}
