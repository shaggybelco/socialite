import { Component, OnInit } from '@angular/core';
import { SortUsersService } from 'src/app/services/sort-users.service';
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
  pushAllUsers: any = [];
  follo: any = [];
  sortUserPush: any = [];
  followe: any = [];

  dataGlobal!: any; //! to prevent problems when accepting data
  constructor(
    private userservice: SuggestedUsersService,
    private un: UnfollowService,
    private userSort: SortUsersService
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

  

 

  ngOnInit() {
    this.getUsers();
    this.getFollow();

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
      for (let i = 0; i < data[0].follow.length; i++) {
        const element = data[0].follow[i];
        this.userservice.getOne(element).subscribe((followed: any) => {
          for (let i = 0; i < followed.length; i++) {
            this.followe.push(followed[i]);
          }
          console.log('pushed ', this.followe);
        });
      }
      this.dataGlobal = data;
    });
  }

  getUsers(){
    this.userSort.getall(this.current_id).subscribe(
      (user)=>{
        this.pushAllUsers = user;
        console.log("this are all users ", this.pushAllUsers)
        this.startSorting();
      }
    )
  }

  getFollow(){
    this.userSort.getFriends(this.current_id).subscribe(
      (foll: any)=>{
        console.log("this are the people I am following ", foll);
      for (let i = 0; i < foll[0].follow.length; i++) {
        const element = foll[0].follow[i];
        this.userservice.getOne(element).subscribe((followed: any) => {
          for (let i = 0; i < followed.length; i++) {
            this.follo.push(followed[i]);
          }
          console.log('this are the people I am following no 2: ', this.follo);
        });
      }
      }
    )
  }

  startSorting(){
    console.log("booting ",this.follo)
    for (let i = 0; i < this.pushAllUsers.length; i++) {
      const element = this.pushAllUsers[i];
      console.log('starting ', element)
      for (let j = 0; j < this.follo.length; j++) {
        const ele = this.follo[j];
        console.log("inside starting ", ele)
      }
    }
  }
}
