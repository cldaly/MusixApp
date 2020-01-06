import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { User } from './models/user';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
 

  image:any;
  isLoggedIn:boolean = false;

  display:string;
  constructor(private userService:UserService, private router:Router) { 
    this.userService.getLoginStatus().subscribe(value => {
      this.isLoggedIn = value;
    });
    this.userService.profileImgSub().subscribe(data => {
      this.image = data;
    });
  }
  
  title = 'Musix App';
 

  close(){
    this.display = null;
  }

  logout(){
    this.userService.logout();
    if (this.router.url === '/profile') {
      this.router.navigate(['/']);
    }
    this.display = "You have been logged out!";
  }

    
  
}
