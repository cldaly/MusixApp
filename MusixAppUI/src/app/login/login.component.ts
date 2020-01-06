import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted:boolean;
  loading:boolean;

  message:string;
  invalid:boolean;

  constructor(
    private router:Router,
    private app:AppComponent,
    private userService:UserService,
    private formBuilder:FormBuilder
  ) { 
    if (this.userService.getCurrentLoginStatus) { 
      this.router.navigate(['/']);
    }
  }

  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required]
    });
    this.submitted = false;
    this.loading = false;
    this.invalid = false;
  }

  onSubmit(){
    this.submitted = true;
    if (this.loginForm.valid){
      this.loading = true;
      this.userService.login(new User(this.loginForm.value.email, this.loginForm.value.password)).subscribe(data => {
        this.app.displayMessage("You have been logged in!",10);
        this.router.navigate(['/']);
      }, error =>{
        this.app.display = null;
        this.invalid = true;
        try {
          this.message = error.error.message;
          if (this.message == undefined || this.message == null) {
            this.message = "Failed to login, please try again later";
          }
        } catch (err) {
          this.message = "Failed to login, please try again later";
        } finally {
          this.loading = false;
        }
      },() => {
        this.loading = false;
      });
    }
  }

  close(){
    this.invalid = false;
    this.message = null;
  }
}
