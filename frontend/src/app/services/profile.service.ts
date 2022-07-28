import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorizeService } from '../services/authorize.service';

const token = localStorage.getItem('token');

const httpOptions = {
  Headers: new HttpHeaders({'Content-Type': 'application/json','token': `${token}`}),
  responseType: 'json' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  currentUser: any;

  baseurl: string = 'https://socialitesapp.herokuapp.com';

  constructor(private view: HttpClient, private authService: AuthorizeService) { }

  getID(){
    return this.view.get(`${this.baseurl}/user/getid`, httpOptions);
  }

  viewPosts(){
    return this.view.get(`${this.baseurl}/news/getothers`, {responseType: 'json'});
  }

  getProfileImage(id: any){
    return this.view.get(`${this.baseurl}/news/getprofileImage/${id}`, {responseType: 'json'});
  }

  post(body: any){
    return this.view.post(`${this.baseurl}/news/poststatus`, body, {responseType: 'json'});
  }

  getPic(id: any){
    return this.view.get(`${this.baseurl}/user/getimage/${id}`)
  }

  getAll(id:any){
    return this.view.get(`${this.baseurl}/user/getone/${id}`)

  }

  getFollowers(id: any){
    return this.view.get(`${this.baseurl}/user/followers/${id}`)
  }

  getFollowing(id: any){
    return this.view.get(`${this.baseurl}/user/getfollow/${id}`, {responseType: 'json'})
  }

  deletePost(postid: any, id: any){
    return this.view.delete(`${this.baseurl}/user/delete/${postid}/${id}`, {responseType: 'text'})
  }

  checkFollow(id: any, followid: any){
    return this.view.get(`${this.baseurl}/user/check/${id}/${followid}`, {responseType: 'json'})
   
  }
}
