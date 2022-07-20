import { Component, OnInit } from '@angular/core';
import { SuggestedUsersService } from 'src/app/services/suggested-users.service';
import { UnfollowService } from 'src/app/services/unfollow.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  current_id = localStorage.getItem('user_id');
  suggested_Users!: any;
  suggested_User!: any;
  follow_body: any;
  status: any = 'follow';
  follow: boolean = false;
  users: any = [];

  dataGlobal!: any; //! to prevent problems when accepting data
  constructor(
    private userservice: SuggestedUsersService,
    private un: UnfollowService
  ) {}

  followUsers(index: any) {
    if (this.follow == false) {
      this.follow = true;
      this.status = 'pending';
    }

    this.users[index] = [];

    //array for storing data to be passed at dabase
    const follower = {
      userid: localStorage.getItem('user_id'),
      followid: this.suggested_Users[index].id,
      followStatus: 'pending',
      followerStatus: 'pending',
    };

    //call the service to activate the follower method inside the
    this.userservice.followUsers(follower).subscribe((data) => {
      alert('Success');
    });

    console.log(
      this.users[index].id,
      'followed by ',
      localStorage.getItem('user_id')
    );

    window.location.reload();

    return console.log(this.users[index]);
  }

  unfollow(num: any):void {
    console.log(
      'this is an id ',
      this.followe[num].id,
      ' and this is name ',
      this.followe[num].name
    );

    const data = {
      id: this.current_id,
      userid: this.followe[num].id,
    };

    // this.un.unfollow(data).subscribe((data) => {
    //   console.log('Data to be passed', data);
    // });

    this.un.unfollow(data).subscribe(
      (net)=>{
        console.log(net);
      }
    )
    window.location.reload();
  }


  followe: any = [];

  ngOnInit() {
    this.userservice
      .getSuggestedUsers(this.current_id)
      .subscribe((suggested: any) => {
        console.log('all users ', suggested);

        this.suggested_Users = suggested;

        // for (let i = 0; i < this.suggested_Users.length; i++) {
        //   if (this.suggested_Users[i].followstatus == 'pending') {
        //     console.log(this.suggested_Users[i].id)
        //   } else {
        //     console.log("users not pending ", this.suggested_Users[i].name)
        //     this.users.push(this.suggested_Users[i]);
        //   }
        // }
        // console.log("show pushed ", this.users)
      });
    //getting following users

    this.userservice.getFriends(this.current_id).subscribe((data: any) => {
      console.log(data[0].follow);
      for (let i = 0; i < data[0].follow.length; i++) {
        const element = data[0].follow[i];
        console.log('element ', element);
        this.userservice.getOne(element).subscribe((followed: any) => {
          console.log('just consoled ', followed);
          for (let i = 0; i < followed.length; i++) {
            this.followe.push(followed[i]);
          }
          console.log('pushed ', this.followe);
        });
      }
      this.dataGlobal = data;
    });
  }
}
