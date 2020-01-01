import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { PasswordMatch } from '../_helpers/password-match.validator';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  submitted = false;
  loading:boolean;

  message:string;
  invalid:boolean;

  constructor(
      private userService:UserService, 
      private router:Router,
      private app:AppComponent,
      private formBuilder:FormBuilder
  ) { 
    if (this.userService.currentUserValue) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['',[Validators.required, Validators.minLength(6)]],
      confPassword : ['',[Validators.required, Validators.minLength(6)]]
    }, {
      validator : PasswordMatch('password', 'confPassword')
    });
    this.loading = false;
    this.invalid = false;
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;
    if (this.registerForm.valid) {
      this.loading = true;
      let newUser = new User(
        this.registerForm.value.email, 
        this.registerForm.value.password
      );
      this.userService.register(newUser).subscribe(data => {
        if (data.registered) {
          this.userService.login(newUser.email, newUser.password).subscribe(data => {
            this.app.display="You have been registered!";
            this.router.navigate(['/']);
          });
        } else {
          this.invalid = true;
          this.message = data.message;
        }
      }, error => {
        console.log(error);
        this.invalid = true;
        this.message = "Something went wrong";
      }, () => {
        this.loading = false;
      });
    }
  }

}
