import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searching:boolean;
  criteria:string;
  message:string;

  type:string;

  constructor(private app:AppComponent) { }

  ngOnInit() {
    this.searching = false;
    this.type = "artist";
  }

  search(){
    this.searching=true;
    this.message = this.criteria;
  }
}
