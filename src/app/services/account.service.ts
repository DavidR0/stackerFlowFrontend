import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
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

  login(email: string, password: string) {

    return this.http.post<User>(`${environment.apiUrl}/api/session/create`, { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    //invalidate token if we can
    if(this.userSubject.value.refreshToken && this.userSubject.value.userId){
      this.http.patch<{ jwtToken: string, valid: boolean, id: number, userId: number }>(`${environment.apiUrl}/api/session/update`, { id: this.userSubject.value.sessionId, valid: false }).pipe(first()).subscribe(() => {
        this.router.navigate(['/login']);
      });  
    } else{
      this.router.navigate(['/login']);
    }

    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next({} as User);
    
  }

  register(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/api/user/create`,
      { email: user.email, password: user.password, userName: user.userName, type: user.type});
  }

  getAccount(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/api/user/get`, { userId: user.userId });
  }

  banUser(user: User) {
    return this.http.patch<User>(`${environment.apiUrl}/api/user/update`, { userId: user.userId, banned: !user.banned });
  }
}
