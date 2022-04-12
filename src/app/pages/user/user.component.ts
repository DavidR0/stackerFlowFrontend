import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import User from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User = new User();
  constructor(private route: ActivatedRoute, private accountService: AccountService) { 
    this.user.userId = this.route.snapshot.params['id'];
  }

  async ngOnInit(): Promise<void> {
    this.user = await firstValueFrom(this.accountService.getAccount(this.user));
  }
}
