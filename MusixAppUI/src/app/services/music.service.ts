import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Artist } from '../models/artist';
@Injectable({
  providedIn: 'root'
})
export class MusicService {
  YOUR_API_KEY:string = "d02851a81c8e025c628c78519b0e0bd5";
  artistName:Array<Artist> = [];
  constructor(private HttpClient:HttpClient) { }

  getMusicByTrackName(trackName:string) {

    return this.HttpClient.get('http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + trackName + '&api_key=' + this.YOUR_API_KEY + '&format=json');
  }

  getMusicByAlbumName(albumName:string) {
    return this.HttpClient.get('http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + albumName + '&api_key=' + this.YOUR_API_KEY + '&format=json');
  }

  getArtistByName(artistName:string) {
    this.HttpClient.get('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist='+ artistName + '&api_key=' + this.YOUR_API_KEY + '&format=json').subscribe(
      data => {
        for(let artist of data["results"]["artistmatches"]["artist"]) {
          let eachArtist=new Artist();
          eachArtist.artistName = artist["name"];
          this.artistName.push(eachArtist);
          console.log(eachArtist);
        }       
        console.log(this.artistName);
      }
    );
  }
  // One method pulling by track name
  // Other pulling by album name
}
