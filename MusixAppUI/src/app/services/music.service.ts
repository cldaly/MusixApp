import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MusicService {
  YOUR_API_KEY:string = "d02851a81c8e025c628c78519b0e0bd5";
  constructor(private HttpClient:HttpClient) { }

  getMusicByTrackName(trackName:string) {

    return this.HttpClient.get('http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + trackName + '&api_key=' + this.YOUR_API_KEY + '&format=json');
  }

  getMusicByAlbumName(albumName:string) {
    return this.HttpClient.get('http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + albumName + '&api_key=' + this.YOUR_API_KEY + '&format=json');
  }

  getArtistByName(artistName:string) {
    let artists = [];
    this.HttpClient.get('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist='+ artistName + '&api_key=' + this.YOUR_API_KEY + '&format=json').subscribe(
      data => {
        for(let artist of data["results"]["artistmatches"]["artist"]) {
          artists.push(artist["name"]);
        }       
        console.log(artists);
      }
    );
    return artists;
  }
  // One method pulling by track name
  // Other pulling by album name
}
