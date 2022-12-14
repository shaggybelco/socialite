import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnfollowService {

  constructor(private http: HttpClient) { }
  baseurl: string = 'https://socialitesapp.herokuapp.com';
  
  unfollow(ids: any){
    return this.http.put(`${this.baseurl}/users/unfollow`, ids, {responseType: 'text'});
  } 
}
