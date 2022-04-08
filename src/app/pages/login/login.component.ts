import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  loginMSG: string | boolean;

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private accountService: AccountService) { 
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit(){
    this.submitted = true;

     // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.accountService.login(this.form.value.email,this.form.value.password).pipe(first())
    .subscribe(
      () => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.loginMSG = error;
        this.loading = false;
      });
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/home'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
