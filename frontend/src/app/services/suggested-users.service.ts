import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuggestedUsersService {

  baseurl:string = "http://localhost:5050";

  constructor(private http:HttpClient) { }

  getSuggestedUsers()
  {
     return this.http.get(`${this.baseurl}/user/suggestedUsers`);
  }


  followUsers(body :any)
  {
      return this.http.post(`${this.baseurl}/user/toFollow/`,body)
  }
}
