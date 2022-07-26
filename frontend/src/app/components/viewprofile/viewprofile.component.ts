import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { Spinkit } from 'ng-http-loader';
import { SuggestedUsersService } from 'src/app/services/suggested-users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { UnfollowService } from 'src/app/services/unfollow.service';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.scss'],
})
export class ViewprofileComponent implements OnInit {
  spinnerStyle = Spinkit;
  constructor(
    private userservice: SuggestedUsersService,
    private router: Router,
    private route: ActivatedRoute,
    private profile: ProfileService,
    private un: UnfollowService
  ) {}

  userID: any = localStorage.getItem('count');
  loggedInUser: any;
  name: any;
  numberOfFollowing: any;
  numberOfFollowers: any;
  imgpost: any;
  follow: any = sessionStorage.getItem('status');
  followBool: boolean = false;
  unfollowB: boolean = true;
  option: any;

  ngDoCheck() {
   
  }

  ngOnInit(): void {
    //geting id from the token
    this.profile.getID().subscribe((decoded: any)=>{
      this.loggedInUser = decoded.decoded.id;
      this.afterId();
    })
  }
  afterId(){
    
     
    this.userservice.getOne(this.userID).subscribe((followed: any) => {
      this.name = followed[0].name;
    });

    this.profile.getPic(this.userID).subscribe((imgstat: any) => {
      this.imgpost = imgstat;
    });

    this.checkFollow();
    this.getFollowers();
    this.getFollow();
  }

  //check
  checkFollow(){
    this.profile
    .checkFollow(this.loggedInUser, this.userID)
    .subscribe((rows: any) => {
      if (rows.length != 0) {
        this.option = 'unfollow';
        this.followBool = true;
      } else {
        this.option = 'follow';
        this.followBool = false;
      }
    });
  }
  //follow user
  followUser() {
    //array for storing data to be passed at dabase
    const follower = {
      userid: this.loggedInUser,
      followid: this.userID,
    };

    this.followBool = true;
    console.log('it works from follow to', this.option);

    //call the service to activate the follower method inside the
    this.userservice.followUsers(follower).subscribe((data) => {
      this.getFollowers();
      this.getFollow();    
    });

    

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/viewprofile'], { relativeTo: this.route });
  }

  //unfollow user
  unfollow() {
    this.unfollowB = false;
    console.log('it works from unfollow to', this.option);

    const data = {
      id: this.loggedInUser,
      userid: this.userID,
    };

    this.un.unfollow(data).subscribe((net: any) =>{
      this.getFollowers();
    this.getFollow();
    });

    

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/viwprofile'], { relativeTo: this.route });
  }

  //get how many ppl the other user is following
  getFollow() {
    this.profile.getFollowing(this.userID).subscribe({
      next: (data: any) => {
        this.numberOfFollowing = data.length;
        this.checkFollow()
      },
    });
  }

  //get how many users are following this user
  getFollowers() {
    this.profile.getFollowers(this.userID).subscribe({
      next: (data: any) => {
        this.numberOfFollowers = data[0].count;
        this.checkFollow()
      },
    });
  }

  transform(date: any) {
    if (!date) {
      return 'a long time ago';
    }
    let time = (Date.now() - Date.parse(date)) / 1000;
    if (time < 10) {
      return 'just now';
    } else if (time < 60) {
      return 'a second ago';
    }
    const divider = [60, 60, 24, 30, 12];
    const string = [' second', ' minute', ' hour', ' day', ' month', ' year'];
    let i;
    for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
      time /= divider[i];
    }
    const plural = Math.floor(time) > 1 ? 's' : '';
    return Math.floor(time) + string[i] + plural + ' ago';
  }
}
