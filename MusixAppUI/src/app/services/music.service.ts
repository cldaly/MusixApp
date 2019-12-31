import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Album } from '../models/album';
import { Tracks } from '../models/tracks';
@Injectable({
  providedIn: 'root'
})
export class MusicService {
  YOUR_API_KEY:string = "d02851a81c8e025c628c78519b0e0bd5";

  constructor(private HttpClient:HttpClient) { }

  getAlbumByArtist(artistName:string){
    let albumlist: Array<Album> =[];
    this.HttpClient.get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artistName}&api_key=${this.YOUR_API_KEY}&format=json`).subscribe(
      data => {
        for(let albm of data["topalbums"]["album"]){
          let album = new Album();
          album.albumName=albm["name"];
          album.artist=albm["artist"]["name"];
          album.imgUrl=albm["image"][2]["#text"];
          if(albm["name"]!=="(null)"){
            albumlist.push(album);
          }
        }
      }
    );
      return albumlist;
  }


  getAlbumByAlbumName(albumName:string){
    let albumlist: Array<Album> =[];
    this.HttpClient.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumName}&api_key=${this.YOUR_API_KEY}&format=json`).subscribe(
      data => {
        for(let albm of data["results"]["albummatches"]["album"]){
          let album = new Album();
          album.albumName=albm["name"];
          album.artist=albm["artist"];
          album.imgUrl=albm["image"][2]["#text"];
          if(albm["name"]!=="(null)"){
            albumlist.push(album);
          }
        }
      }
    );
    return albumlist;
  }

  getTracksByArtistAndAlbum(albumName:string, artist:string){
    let tracklist:Array<Tracks>=[];
    this.HttpClient.get(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${this.YOUR_API_KEY}&artist=${artist}&album=${albumName}&format=json`).subscribe(
      data=>{
        for(let track of data["album"]["tracks"]["track"]){
          let tracks = new Tracks();
          tracks.album = data["album"]["name"];
          tracks.artist = data["album"]["artist"];
          tracks.image = data["album"]["image"][2]["#text"];
          tracks.trackName = track["name"];
          tracklist.push(tracks);
        }
      } 
    );
      return tracklist;
  }


  // One method pulling by track name
  // Other pulling by album name
}
