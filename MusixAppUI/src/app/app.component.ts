import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser:User;

  display:string;
  constructor(private userService:UserService, private router:Router) { 
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
  
  title = 'Musix App';

  close(){
    this.display = null;
  }

  logout(){
    this.userService.logout();
    this.display = "You have been logged out!";
  }
}
