import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Album } from '../models/album';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  albumRecs:BehaviorSubject<Album[]>;

  refreshAlbumRecs():void {
    this.getalbums().subscribe(data => {
      this.albumRecs.next(data);
    });
  }

  addAlbumRec(album:Album) {
    this.getalbums().subscribe(data => {
      let albums = data;
      albums.push(album);
      this.albumRecs.next(albums);
    })
  }

  getAlbumRecs():Observable<Album[]>{
    this.refreshAlbumRecs();
    return this.albumRecs.asObservable();
  }

  constructor(private http:HttpClient) {
    this.albumRecs = new BehaviorSubject<Album[]>([]);
  }

  addalbum(album:Album):Observable<Album>{
    let params = new HttpParams().append('user_id',localStorage.getItem("userid"))
                  .append('Authorization','Bearer '+localStorage.getItem("Token"));
    return this.http.post<Album>("http://localhost:8080/albums/addalbum",album, {params});
  }

  getalbums() : Observable<Array<Album>>{
    let params = new HttpParams().append('user_id',localStorage.getItem("userid"))
                  .append('Authorization','Bearer '+localStorage.getItem("Token"));
    return this.http.get<Array<Album>>("http://localhost:8080/albums/getalbums",{params});
  }

  deletealbums(id:number){
    let params = new HttpParams().append('user_id',localStorage.getItem("userid"))
                  .append('Authorization','Bearer '+localStorage.getItem("Token"));
    return this.http.delete("http://localhost:8080/albums/delete/"+id,{params});
  }
}
