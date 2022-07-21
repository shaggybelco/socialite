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
  suggestedNameID: any = [];

  dataGlobal!: any; //! to prevent problems when accepting data
  constructor(
    private userservice: SuggestedUsersService,
    private un: UnfollowService,
    private userSort: SortUsersService
  ) {}

  // get followers and people who following you
  followUsers(index: any) {

    //array for storing data to be passed at dabase
    const follower = {
      userid: localStorage.getItem('user_id'),
      followid: this.suggestedNameID[index].id,
    };

    //call the service to activate the follower method inside the
    this.userservice.followUsers(follower).subscribe((data) => {
      alert('Success');
    });

    window.location.reload();

    return console.log(this.suggestedNameID[index]);
  }

  unfollow(num: any): void {
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

    this.un.unfollow(data).subscribe((net) => {
      console.log(net);
    });
    window.location.reload();
  }

  //get users and sorting according
  getUsers() {

    this.userSort.getall(this.current_id).subscribe((user) => {
      this.pushAllUsers = user;
      console.log('this are all users got ', this.pushAllUsers);
    
        // console.log(this.pushAllUsers);
        
        
  
    });

    

    // return this.pushAllUsers;
  }

  getFollow() {
    this.userSort.getFriends(this.current_id).subscribe((foll: any) => {
      console.log('this are the people I am following ', foll);
      for (let i = 0; i < foll[0].follow.length; i++) {
        const element = foll[0].follow[i];
        this.userservice.getOne(element).subscribe((followed: any) => {
          for (let i = 0; i < followed.length; i++) {
            this.follo.push(followed[i]);
          }
          console.log('this are the people I am following no 2: ', this.follo);
        });
      }
      this.startSorting(foll, this.pushAllUsers);
    });
    
    return this.follo;
  }
 

  startSorting(pushed: any, pushUsers: any) {
    // console.log('starting ', pushed);
    const suggested: any = [];
    
    if(pushUsers.length === 0){
      window.location.reload();
    }
    pushed.forEach((element: any) => {
      console.log("from foreach ",pushed[0].follow, " all userss inside", pushUsers)
      pushUsers.forEach((newUser: any) => {
        const isNotFollow = pushed[0].follow.includes(newUser.id);
        console.log("new users ", newUser.id," name ", newUser.name, isNotFollow)
        
        if(isNotFollow){
          console.log("followed by me: ",isNotFollow)
        }else{
          console.log("Not followed ",isNotFollow);
          suggested.push(newUser.id);
          this.suggestedNameID.push(newUser);
        }
      });
    });
    console.log("after push not followed ", suggested, " not followed by me:  ", this.suggestedNameID)
  }

  async global() {
    await this.getFollow();
    await this.getUsers();
  }

  ngOnInit() {
    this.global();
    // this.getFollow();
    
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
}
