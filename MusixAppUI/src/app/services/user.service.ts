import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentLoginStatus:BehaviorSubject<boolean>;

  profileImg:BehaviorSubject<any>;
  profileImgSub():Observable<any>{
    return this.profileImg.asObservable();
  }

  constructor(private http: HttpClient) {
    this.profileImg = new BehaviorSubject<any>(localStorage.getItem('profileImage'));
    if (!localStorage.getItem("Token")) {
      this.currentLoginStatus = new BehaviorSubject<boolean>(false);
    } else {
      this.currentLoginStatus = new BehaviorSubject<boolean>(true);
    }
  }

  public get getCurrentLoginStatus(): boolean {
    return this.currentLoginStatus.value;
  }

  getLoginStatus():Observable<boolean> {
    return this.currentLoginStatus.asObservable();
  } 

  setLoginStatus(isLoggedIn:boolean):void {
    this.currentLoginStatus.next(isLoggedIn);
  }

  login(user:User) {
    return this.http.post<any>('http://localhost:8080/users/authenticate',user).pipe(map(data => {
      localStorage.setItem('Token', data["jwt"]);
      localStorage.setItem('userid',data["user_id"]);
      this.getprofileimage().subscribe(data => {
        this.profileImg.next('data:image/png;base64,'+data["profileImage"]);
        localStorage.setItem('profileImage','data:image/png;base64,'+data["profileImage"]);
        localStorage.setItem('email', data['email']);
      });
      this.setLoginStatus(true);
      return data;
    }));
  }
  
  logout(){
    localStorage.clear();
    this.setLoginStatus(false);
  }

  register(formdata:FormData) {
    return this.http.post<any>('http://localhost:8080/users/adduser', formdata);
  }

  getprofileimage():Observable<User>{
    let params = new HttpParams().append('user_id',localStorage.getItem("userid"))
                  .append('Authorization','Bearer '+localStorage.getItem("Token"));
   return this.http.get<User>("http://localhost:8080/users/getuserimage", {params});
  }

  deleteprofile():Observable<any>{
    let params = new HttpParams().append('user_id',localStorage.getItem("userid"))
                  .append('Authorization','Bearer '+localStorage.getItem("Token"));
    return this.http.delete("http://localhost:8080/users/deleteuser",{params});
  }

  upadateprofileimage(formdata:FormData){
    let params = new HttpParams().append('user_id',localStorage.getItem("userid"))
                  .append('Authorization','Bearer '+localStorage.getItem("Token"));  
    return this.http.put('http://localhost:8080/users/changeprofilepicture', formdata,{params}).pipe(map(() =>{
      this.getprofileimage().subscribe(data=>{
        this.profileImg.next('data:image/png;base64,'+data["profileImage"]);
        localStorage.setItem('profileImage','data:image/png;base64,'+data["profileImage"]);
        return data;
      });
    })
    );
  }

  changepassword(formdata:FormData){
    let params = new HttpParams()
                  .append('Authorization','Bearer '+localStorage.getItem("Token"))
                  .append('user_id',localStorage.getItem("userid"));
    return this.http.put('http://localhost:8080/users/changepassword',formdata,{params}); 
  }
}
