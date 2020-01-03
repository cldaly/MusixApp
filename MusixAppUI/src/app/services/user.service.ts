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

  constructor(private http: HttpClient) {
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
      this.setLoginStatus(true);
      return data;
    }));
  }
  
  logout(){
    localStorage.removeItem('Token');
    localStorage.removeItem('userid');
    localStorage.removeItem("profileimage");
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
}
