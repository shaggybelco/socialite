import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { SuggestedUsersService } from 'src/app/services/suggested-users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  suggested_Users!: any;
  follow_body: any
  status: any = "Following"
  constructor(private userservice: SuggestedUsersService) { }




  followUsers(index: any) {
    const follower = {
      userid: localStorage.getItem('user_id'),
      followid: this.suggested_Users[index].id,
      followStatus: "pending",
      followerStatus: "pending"
    }

    this.userservice.followUsers(follower).subscribe(
      (data: any) => {
        alert("Successful folloed ")
      },
      (err) => {
        alert("Failed to follow")
      }
    );

    console.log(this.suggested_Users[index].id, "followed with ", localStorage.getItem('user_id'));

    return console.log(this.suggested_Users[index]);

  }

  ngOnInit(): void {

    this.userservice.getSuggestedUsers().subscribe((suggested) => {
      console.log(suggested);
      this.suggested_Users = suggested;

    })
    // let user ={
    //   data:{
    //      userid: this.suggested_Users[index].user_id,
    //      followid: this.suggested_Users[index].user_id,
    //     followstatus: this.status
    //   }      
    // }
    // this.userservice.followUsers(this.follow_body).subscribe((followData)=>{
    //   console.log(followData, "Posted from Frontend");
    // })


  }

}