import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseurl:string = "http://localhost:5050";

  constructor(private view: HttpClient) { }

  viewPost(id: any){
    return this.view.get(`${this.baseurl}/news/getother/${id}`,{responseType: 'json'});
  }

  post(body: any){
    return this.view.post(`${this.baseurl}/news/poststatus`, body);
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
