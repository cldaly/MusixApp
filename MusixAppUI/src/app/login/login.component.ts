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
  ) { }

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
      console.log(this.loginForm.value);
      this.invalid = true;
      this.message = "test invalid box";

    }
  }

  close(){
    this.invalid = false;
    this.message = null;
    this.loading = false;
  }
}
