import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject:BehaviorSubject<User>;
  public currentUser:Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user:User) {
    return this.http.post<any>('http://localhost:8080/users/authenticate',user);
  }
  
  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(user:User) {
    return this.http.post<any>('http://localhost:8080/users/adduser', user);
  }
}
