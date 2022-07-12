import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { SuggestedUsersService } from 'src/app/services/suggested-users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  suggested_Users!:any;
  follow_body :any 
  status : any ="Following"
  constructor(private userservice:SuggestedUsersService) { }

  
  

  followUsers(index:any){
    return console.log(this.suggested_Users[index]);
    let user ={
      data:{
         userid: this.suggested_Users[index].user_id,
         followid: this.suggested_Users[index].user_id,
        followstatus: this.status
      }      
    }
  }

  ngOnInit(): void {

    this.userservice.getSuggestedUsers().subscribe((suggested)=>{
      console.log(suggested);
      this.suggested_Users = suggested;
    })

    // this.userservice.followUsers(this.follow_body).subscribe((followData)=>{
    //   console.log(followData, "Posted from Frontend");
    // })
  }
  

}