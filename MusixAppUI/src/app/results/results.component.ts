import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { MusicService } from '../services/music.service';
import { Album } from '../models/album';
import { Tracks } from '../models/tracks';

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

  constructor(private musicservice: MusicService) {}

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.isTrack=false;
    this.isalbum=true;
    if(this.searchtype==="artist"){
      this.albumlist=this.musicservice.getAlbumByArtist(this.message);
    }else if(this.searchtype==="album"){
      this.albumlist=this.musicservice.getAlbumByAlbumName(this.message);
    }
  }

  ngOnInit() {
    
  }

  showtracks(albumName:string,artist:string){
    this.tracklist=this.musicservice.getTracksByArtistAndAlbum(albumName,artist);
    this.isalbum=false;
    this.isTrack=true;
  }

  goback(){
    this.isTrack=false;
    this.isalbum=true;
  }

}
