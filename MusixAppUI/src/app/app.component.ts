import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser:User;

  display:string;
  constructor(private auth:AuthenticationService, private router:Router) { 
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
  
  title = 'Musix App';

  close(){
    this.display = null;
  }

  logout(){
    this.auth.logout();
    this.display = "You have been logged out!";
  }
}
