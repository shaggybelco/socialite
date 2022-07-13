import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { empty } from 'rxjs';
import { SuggestedUsersService } from 'src/app/services/suggested-users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  current_id = localStorage.getItem('user_id')
  suggested_Users!: any;
  suggested_User!: any;
  follow_body: any
  status: any = "follow"
  follow: boolean = false;
  users: any = [];
  constructor(private userservice: SuggestedUsersService) { }



  followUsers(index: any) {

    if (this.follow == false) {
      this.follow = true;
      this.status = 'pending'

    }

    this.users[index] = [];
    const follower = {
      userid: localStorage.getItem('user_id'),
      followid: this.suggested_Users[index].id,
      followStatus: "pending",
      followerStatus: "pending"
    }

    this.userservice.followUsers(follower).subscribe(
      (data) => {
        alert("Success");

        
      }
    );

    console.log(this.users[index].id, "followed by ", localStorage.getItem('user_id'));

    
    window.location.reload();


    return console.log(this.users[index]);

  }


  ngOnInit(): void {
    
    this.userservice.getSuggestedUsers(this.current_id).subscribe((suggested) => {
      console.log("all users ", suggested);

      this.suggested_Users = suggested;

      for (let i = 0; i < this.suggested_Users.length; i++) {
        if (this.suggested_Users[i].followstatus == 'pending') {
          console.log(this.suggested_Users[i].id)
        } else {

          console.log("users not pending ", this.suggested_Users[i].name)
          this.users.push(this.suggested_Users[i]);

        }


      }

      console.log("show pushed ", this.users)
    })

  }
}