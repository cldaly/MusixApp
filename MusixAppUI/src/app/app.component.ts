import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  currentUser:User;

  loginStatus:boolean;
  display:string;
  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
  }
  
  title = 'Musix App';

  close(){
    this.display = null;
  }
}
