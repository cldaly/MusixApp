import { Component, OnInit } from '@angular/core';
import { MusicService } from './services/music.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private music:MusicService) {}
  ngOnInit(): void {
    this.music.getArtistByName("Cher");
  }
  title = 'MusixAppUI';
}
