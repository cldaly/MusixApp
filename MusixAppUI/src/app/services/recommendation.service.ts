import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor(private http:HttpClient) { }

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
