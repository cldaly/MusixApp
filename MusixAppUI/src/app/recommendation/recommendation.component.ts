import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { Tracks } from '../models/tracks';
import { UserService } from '../services/user.service';
import { RecommendationService } from '../services/recommendation.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  albumview:boolean=false;
  trackview:boolean=false;

  albumlist:Album[]=[];
  tracklist:Tracks[]=[];

  a:Album;

  status:string;
  prevStatus:string;
  errorMessage:string;

  constructor(
    private userService:UserService, 
    private musicservice:MusicService,
    private rec:RecommendationService, 
    private router:Router,
    private app:AppComponent
  ) { 
    if (!this.userService.getCurrentLoginStatus) {
      this.router.navigate(['/search']);
      this.app.display = "Login to view recommendations";
    }
  }

  ngOnInit() {

    this.musicservice.getStatus().subscribe(value => {
      this.status = value;
    });
    
    this.albumview = true;
    this.trackview = false;
    this.status = "searching";

    this.rec.getalbums().subscribe(data => {
      if (data.length > 0) {
        this.albumlist = data;
        this.status = 'complete';
      } else {
        this.status = 'none';
      }
    }, error => {
      this.status = 'error';
      this.errorMessage = error.error.message;
    });
  }

  showtracks(album:Album){
    this.a = album;
    this.prevStatus = this.status;

    this.tracklist=this.musicservice.getTracksByArtistAndAlbum(album.albumName,album.artist);
    this.albumview=false;
    this.trackview=true;
  }

  goback(){
    this.status = this.prevStatus;
    this.a = null

    this.trackview=false;
    this.albumview=true;
  }

  unrecommend(album:Album) {
    this.albumlist = this.albumlist.filter(a => {
      return (a.id !== album.id);
    });
    this.rec.deletealbums(album.id).subscribe(() => {},err => {
      this.errorMessage = err.message;
      console.log(err);
    }, () => {
      if (this.albumlist.length == 0) this.status = 'none';
    });
  }

  close() {
    this.errorMessage = null;
  }

  recommend(album:Album) {
    this.rec.addalbum(album).subscribe(data=>{
      this.albumlist.push(data);
      this.status = 'complete';
      console.log(`${album.albumName} has been saved!`);
    },
    error=>{
      console.log(error);
    });
  }

}
