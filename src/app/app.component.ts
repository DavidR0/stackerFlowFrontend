import { Component } from '@angular/core';
import User from './models/user';
import { AccountService } from './services/account.service';

//The root component contains items that are generic throughout the site, as in the navbar
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'stackerflow';
  user : User;

  constructor(private accountService: AccountService){
    //Subscribe to user change events, such as login/logout
    accountService.user.subscribe(x => {
      this.user = x;
    });
  }

  onLogout(){
    this.accountService.logout();
  }

}
