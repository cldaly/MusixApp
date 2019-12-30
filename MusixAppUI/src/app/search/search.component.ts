import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.searching = false;
    this.type = "artist";
  }

  search(){
    this.searching=true;
    this.message = this.criteria;
  }
}
