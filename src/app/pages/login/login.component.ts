import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  constructor(private accountService: AccountService) { 
    accountService.user.subscribe(x => {
      this.user = x;
    });
  }

  onLogin(){
    this.accountService.login("t","t");
  }

  onLogout(){
    this.accountService.logout();
  }

  onShowState(){
    console.log(this.user);
  }
  ngOnInit(): void {
  }

}
