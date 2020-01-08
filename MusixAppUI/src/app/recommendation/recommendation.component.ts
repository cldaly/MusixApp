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

  constructor(
    private userService:UserService, 
    private musicservice:MusicService,
    private rec:RecommendationService, 
    private router:Router,
    private app:AppComponent
  ) { 
    if (!this.userService.getCurrentLoginStatus) {
      this.router.navigate(['/search']);
      this.app.displayMessage("Login to view recommendations",2);
    } 
    
  }

  ngOnInit() {

    this.albumview = true;
    this.trackview = false;
    this.status = "searching";

    this.rec.getAlbumRecs().subscribe(data => {
      this.albumlist = data;
      if (this.albumview){
        if (data.length > 0) {
          this.status = 'complete';
        } else if (data.length == 0) {
          this.status = 'none';
        } else {
          this.status = 'searching';
        }
      }
    }, error => {
      console.log(error.error.message);
    });

    this.musicservice.getStatus().subscribe(value => {
      this.status = value;
    });
    

    
  }

  showtracks(album:Album){
    this.prevStatus = this.status;
    this.a = new Album();
    this.a.albumName = album.albumName;
    this.a.artist = album.artist;
    this.a.imgUrl = album.imgUrl;
    this.a.id = album.id;

    this.tracklist=this.musicservice.getTracksByArtistAndAlbum(this.a.albumName,this.a.artist);
    this.albumview=false;
    this.trackview=true;
  }

  goback(){
    this.status = this.prevStatus;
    this.a = null
    console.log(this.albumlist);
    if (this.albumlist.length == 0) this.status = 'none';

    this.trackview=false;
    this.albumview=true;
  }

  unrecommend(id:number) {
    this.rec.deletealbums(id).subscribe(() => {
      this.rec.refreshAlbumRecs();
      console.log(`Album id ${id} has been removed from your recommednations`);
    },err => {
      console.log(err);
    }, () => {
      this.status = 'complete';
    });
  }

  recommend(album:Album) {
    this.a = new Album();
    this.a.albumName = album.albumName;
    this.a.artist = album.artist;
    this.a.imgUrl = album.imgUrl;
    this.rec.addalbum(this.a).subscribe(()=>{
      console.log(`${album.albumName} has been saved!`);
    },
    error=>{
      console.log(error);
    },()=>{
      this.rec.refreshAlbumRecs();
      this.status = 'complete';
    });
  }

  albumChecker(album:Album){
    for (let a of this.albumlist) {
      if (album.albumName === a.albumName && album.artist === a.artist && album.imgUrl === a.imgUrl) {
        return a.id;
      }
    }
    return 0;
  }
}
