import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuggestedUsersService {

  

  baseurl:string = "http://localhost:5050";

  constructor(private http:HttpClient) { }

  getSuggestedUsers(id: any)
  {
     return this.http.get(`${this.baseurl}/user/suggestedUsers/${id}`);
  }


  followUsers(body :any)
  {
      return this.http.post(`${this.baseurl}/user/toFollow/`,body)
  }
}
