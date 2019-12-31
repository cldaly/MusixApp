import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading:boolean;

  email:FormControl;
  password:FormControl;

  message:string;
  invalid:boolean;

  constructor(
    private router:Router,
    private app:AppComponent,
    private auth:AuthenticationService
  ) { 
    if (this.auth.currentUserValue) { 
      this.router.navigate(['/search']);
    }
  }

  ngOnInit() {
    this.email = new FormControl('',[Validators.required, Validators.email]);
    this.password = new FormControl('',Validators.required);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
    this.loading = false;
    this.invalid = false;
  }

  onSubmit(){
    if (this.loginForm.valid){
      this.loading = true;
      this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(data => {
        if (data) {
          this.app.display = "You have been logged in!";
          this.router.navigate(['/']);
        } else {
          this.app.display = null;
          this.invalid = true;
          this.message = "Invalid Email or Password";
        }
      }, error => {
        this.app.display = null;
          this.invalid = true;
          this.message = "Something went wrong...";
          this.loading = false;
      }, () => {
        this.loading = false;
      });

    }
  }

  close(){
    this.invalid = false;
    this.message = null;
  }
}
