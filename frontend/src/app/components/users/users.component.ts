import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortUsersService } from 'src/app/services/sort-users.service';
import { SuggestedUsersService } from 'src/app/services/suggested-users.service';
import { UnfollowService } from 'src/app/services/unfollow.service';
import { Spinkit } from 'ng-http-loader';

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

  spinnerStyle = Spinkit;
  dataGlobal!: any; //! to prevent problems when accepting data
  constructor(
    private userservice: SuggestedUsersService,
    private un: UnfollowService,
    private userSort: SortUsersService,
    private router: Router,
    private route: ActivatedRoute
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
      console.table(data);
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/users'], { relativeTo: this.route });

  }

  unfollow(num: any): void {
    const data = {
      id: this.current_id,
      userid: this.followe[num].id,
    };

    // this.un.unfollow(data).subscribe((data) => {
    //   console.log('Data to be passed', data);
    // });

    this.un.unfollow(data).subscribe((net) => {});
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/users'], { relativeTo: this.route });
  }

  async getUsers() {
    this.userSort.getall(this.current_id).subscribe({
      next: (user: any) => {
        this.pushAllUsers = user;
      },
      error: (err: any) => {
        alert(err.message);
      },
    });
    await this.pushAllUsers;
  }

  //

  getFollow() {
    this.userSort.getFriends(this.current_id).subscribe((foll: any) => {
      for (let i = 0; i < foll[0].follow.length; i++) {
        const element = foll[0].follow[i];
        this.userservice.getOne(element).subscribe((followed: any) => {
          for (let i = 0; i < followed.length; i++) {
            this.follo.push(followed[i]);
          }
        });
      }
      this.startSorting(foll, this.pushAllUsers);
    });

    return this.follo;
  }

  startSorting(pushed: any, pushUsers: any) {
    // console.log('starting ', pushed);
    const suggested: any = [];

    if (pushed.length != 0 && pushUsers.length === 0) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/users'], { relativeTo: this.route });
    }
    pushed.forEach((element: any) => {
      pushUsers.forEach((newUser: any) => {
        const isNotFollow = pushed[0].follow.includes(newUser.id);
        if (isNotFollow) {
        } else {
          suggested.push(newUser.id);
          this.suggestedNameID.push(newUser);
        }
      });
    });
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
        this.suggested_Users = suggested;
      });
    //getting following users

    this.userservice.getFriends(this.current_id).subscribe((data: any) => {
      for (let i = 0; i < data[0].follow.length; i++) {
        const element = data[0].follow[i];
        this.userservice.getOne(element).subscribe((followed: any) => {
          for (let i = 0; i < followed.length; i++) {
            this.followe.push(followed[i]);
          }
        });
      }
      this.dataGlobal = data;
    });
  }
}
