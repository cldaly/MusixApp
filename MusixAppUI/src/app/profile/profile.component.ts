import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PasswordMatch, PasswordDifferent } from '../_helpers/password-match.validator';
import { AppComponent } from '../app.component';

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
  userfile:any =File;

  submittedPassword = false;
  submittedPicture = false;
  loading:boolean;
  confirmDelete:boolean;

  errorMessage:string;

  constructor(
    private userService:UserService, 
    private router:Router, 
    private formBuilder:FormBuilder,
    private app:AppComponent
  ) { 
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
      this.loading = true;
      const formdata = new FormData();
      formdata.append('oldpassword',this.changePassForm.value.oldPassword);
      formdata.append('newpassword',this.changePassForm.value.newPassword);
      this.userService.changepassword(formdata).subscribe(() => {
        this.userService.logout();
        this.app.displayMessage("Your password has been updated, please login",10);
        this.router.navigate(['/login']);
      },()=>{
        this.errorMessage = "Something went wrong...";
        this.loading = false;
      },()=> {
        this.loading = false;
      });
    }
  }

  onchange(event){
    const file = event.target.files[0];
    this.userfile=file;
  }

  updatePicture(){
    this.submittedPicture = true;
    if (this.pictureForm.valid) {
      this.loading = true;
      const formdata = new FormData();
      formdata.append('file',this.userfile);
      if (this.userfile.size >= 1048576) {
        this.errorMessage = "Sorry, picture is too big!";
      } else {
        this.userService.upadateprofileimage(formdata).subscribe(() => {
          this.app.displayMessage("Your profile picture has been updated",5);
          this.pictureForm.reset();
          this.submittedPicture = false;
        }, () => {
          this.errorMessage = "Something went wrong, please try again";
          this.loading = false;
        },()=>{
          this.loading = false;
        });
      }
    }
  }

  

  delete() {
    if (this.confirmDelete) {
      this.loading = true;
      this.userService.deleteprofile().subscribe(() => {
        this.userService.logout();
        this.app.displayMessage("Your account has been deleted :(", 10);
        this.router.navigate(['/']);
      },()=>{
        this.errorMessage = "Something went wrong, please try again";
        this.loading = false;
      },()=>{
        this.loading = false;
      });
      
    } else {
      this.confirmDelete = true;
    }
  }

  close() {
    this.errorMessage = null;
  }

}
