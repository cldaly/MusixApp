import { Component, OnInit } from '@angular/core';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  submitted:boolean;

  constructor(private results:ResultsComponent) { }

  ngOnInit() {
    this.submitted = false;
  }

  search(){
    this.submitted = true;
  }
}
