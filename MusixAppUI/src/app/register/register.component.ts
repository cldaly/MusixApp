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
  userfile:any =File;

  constructor(
      private userService:UserService, 
      private router:Router,
      private app:AppComponent,
      private formBuilder:FormBuilder
  ) { 
    if (this.userService.getCurrentLoginStatus) { 
      this.router.navigate(['/']);
    }
    this.userfile=new File([''],'none',{type: "image/png"});
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      picture : [null],
      password : ['',[Validators.required, Validators.minLength(6)]],
      confPassword : ['',[Validators.required, Validators.minLength(6)]]
    }, {
      validator : PasswordMatch('password', 'confPassword')
    });
    this.loading = false;
    this.invalid = false;
  }

  get f() { return this.registerForm.controls; }

  onchange(event){
    const file = event.target.files[0];
    this.userfile=file;
  }

  onSubmit(){
    this.submitted = true;
    if (this.registerForm.valid) {
      this.loading = true;
      const formdata = new FormData();
      formdata.append('user',JSON.stringify(this.registerForm.value));
      formdata.append('file',this.userfile);
      this.userService.register(formdata).subscribe(data => {
          this.userService.login(new User(this.registerForm.value.email,this.registerForm.value.password)).subscribe(data => {
            this.app.displayMessage("You have been registered!",10);
            this.router.navigate(['/']);
            this.loading = false;
          });
      }, error => {
        this.app.display = null;
        this.invalid = true;
        try {
          this.message = error.error.message;
          if (this.message == undefined || this.message == null) {
            this.message = "Failed to register, please try again later";
          }
        } catch (err) {
          this.message = "Failed to register, please try again later";
        } finally {
          this.loading = false;
        }
      },() => {
        this.loading=false;
      });
    }
  }
  close() {
    this.message = undefined;
    this.invalid = false;
  }
}
