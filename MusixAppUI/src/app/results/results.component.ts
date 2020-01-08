import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { MusicService } from '../services/music.service';
import { Album } from '../models/album';
import { Tracks } from '../models/tracks';
import { UserService } from '../services/user.service';
import { RecommendationService } from '../services/recommendation.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit,OnChanges {

  @Input() message:string;
  @Input() searchtype:string;
  isalbum:boolean=false;
  isTrack:boolean=false;

  albumlist:Array<Album>=[];
  tracklist:Array<Tracks>=[];

  a:Album;

  albumRecs:Album[];

  status:string;

  loggedIn:boolean;

  constructor(
    private musicservice: MusicService, 
    private userService:UserService,
    private recommendService:RecommendationService
  ) {
    this.userService.getLoginStatus().subscribe(value => this.loggedIn = value);
    this.recommendService.getAlbumRecs().subscribe(data => {
      this.albumRecs = data;
    });
  }

  ngOnChanges(): void {
    if (this.message !== undefined && this.message !== ""){
      this.recommendService.refreshAlbumRecs();
      if(this.searchtype==="artist"){
        this.isTrack=false;
        this.isalbum=true;
        this.albumlist=this.musicservice.getAlbumByArtist(this.message);
      }else if(this.searchtype==="album"){
        this.isTrack=false;
        this.isalbum=true;
        this.albumlist=this.musicservice.getAlbumByAlbumName(this.message);
      }
    }
  }

  ngOnInit() {
    this.musicservice.getStatus().subscribe(value => {
      this.status = value;
    });
  }

  showtracks(album:Album){
    this.a = album;

    this.tracklist=this.musicservice.getTracksByArtistAndAlbum(album.albumName,album.artist);
    this.isalbum=false;
    this.isTrack=true;
  }

  goback(){
    this.status = 'complete';
    this.a = null

    this.isTrack=false;
    this.isalbum=true;
  }

  recommend(album:Album) {
    this.recommendService.addalbum(album).subscribe(()=>{
      console.log(`${album.albumName} has been saved`);
    },
    error=>{
      console.log(error);
    }, () => {
      this.recommendService.refreshAlbumRecs();
    });
  }

  unrecommend(id:number) {
    this.recommendService.deletealbums(id).subscribe(() => {
      console.log(`Album id ${id} has been removed from your recommednations`);
    },err => {
      console.log(err);
    }, () => {
      this.recommendService.refreshAlbumRecs();
    });
  }

  albumChecker(album:Album){
    for (let a of this.albumRecs) {
      if (album.albumName === a.albumName && album.artist === a.artist && album.imgUrl === a.imgUrl) {
        return a.id;
      }
    }
    return 0;
  }
}
