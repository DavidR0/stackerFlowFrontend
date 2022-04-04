import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  
  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) { }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    
    this.loading = true;
    const user = new User();
    user.email = this.form.value.email;
    user.password = this.form.value.password;
    user.username = this.form.value.username;

    this.accountService.register(user);
    this.router.navigate(['/login']);
  }

}
