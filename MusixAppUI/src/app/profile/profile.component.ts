import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PasswordMatch, PasswordDifferent } from '../_helpers/password-match.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  email:string;

  changePassForm:FormGroup;
  pictureForm:FormGroup;
  picture:FormControl;

  submittedPassword = false;
  submittedPicture = false;
  loading:boolean;
  confirmDelete:boolean;

  constructor(private userService:UserService, private router:Router, private formBuilder:FormBuilder) { 
    if (!this.userService.getCurrentLoginStatus) { 
      this.router.navigate(['/']);
    }
  }

  get c() { return this.changePassForm.controls }
  get f() { return this.pictureForm.controls; }

  ngOnInit() {
    this.confirmDelete = false;
    this.email = localStorage.getItem('email');

    this.changePassForm = this.formBuilder.group({
      oldPassword : ['',Validators.required],
      newPassword : ['',[Validators.required,Validators.minLength(6)]],
      confPassword: ['',[Validators.required,Validators.minLength(6)]]
    },{
      validators: [PasswordMatch('newPassword','confPassword'),PasswordDifferent('oldPassword','newPassword')]
    });
    this.picture = new FormControl('',Validators.required);
    this.pictureForm = new FormGroup({
      picture: this.picture
    })
  }

  updatePassword(){
    this.submittedPassword = true;
    if (this.changePassForm.valid) {
      console.log(this.changePassForm.value);
    }
  }

  updatePicture(){
    this.submittedPicture = true;
    if (this.pictureForm.valid) {
      console.log(this.pictureForm.value);
    }
  }

  delete() {
    if (this.confirmDelete) {
      this.confirmDelete = false;
      this.loading = false;
    } else {
      this.confirmDelete = true;
      this.loading = true;
    }
  }

}
