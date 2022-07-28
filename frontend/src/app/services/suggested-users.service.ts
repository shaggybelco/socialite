import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuggestedUsersService {

  

  baseurl: string = 'https://socialitesapp.herokuapp.com';
  // localhost:5050/user/getfollow/30

  constructor(private http:HttpClient) { }

  getSuggestedUsers(id: any)
  {
     return this.http.get(`${this.baseurl}/user/suggestedUsers/${id}`);
  }


  followUsers(body :any)
  {
      return this.http.post(`${this.baseurl}/user/toFollow`,body,{responseType: 'text'})
  }

  getFriends(id: any)
  {
    return this.http.get(`${this.baseurl}/user/getall/${id}`);
  }
  getOne(id: any){
    return this.http.get(`${this.baseurl}/user/getone/${id}`);
  }


  getAllFollowedUsers(id:any)
  {
    return this.http.get(`${this.baseurl}/user/getfollow/${id}`);
  }


}
