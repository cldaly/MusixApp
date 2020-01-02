import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { MusicService } from '../services/music.service';
import { Album } from '../models/album';
import { Tracks } from '../models/tracks';
import { UserService } from '../services/user.service';
import { RecommendationService } from '../services/recommendation.service';

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

  trackImage:string;
  trackArtist:string;
  trackAlbum:string;

  status:string;

  loggedIn:boolean;

  constructor(
    private musicservice: MusicService, 
    private userService:UserService,
    private recommendService:RecommendationService
  ) {
    this.userService.getLoginStatus().subscribe(value => this.loggedIn = value);
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.message !== undefined && this.message !== ""){
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

  showtracks(albumName:string,artist:string,albumImage:string){
    this.tracklist=this.musicservice.getTracksByArtistAndAlbum(albumName,artist);
    
    this.trackImage = albumImage;
    this.trackArtist = artist;
    this.trackAlbum = albumName;

    this.isalbum=false;
    this.isTrack=true;
  }

  goback(){
    this.status = 'complete';
    this.trackImage = null;
    this.trackArtist = null;
    this.trackAlbum = null;

    this.isTrack=false;
    this.isalbum=true;
  }

  recommend(album:Album) {
    this.recommendService.addalbum(album).subscribe(data=>{

    },
    error=>{
      console.log(error);
    });
  }
}
