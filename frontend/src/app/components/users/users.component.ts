import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortUsersService } from 'src/app/services/sort-users.service';
import { SuggestedUsersService } from 'src/app/services/suggested-users.service';
import { UnfollowService } from 'src/app/services/unfollow.service';
import { Spinkit } from 'ng-http-loader';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  profileImg: any;
  img: boolean = false;

  ngOnInit() {
    this.profile.getID().subscribe((decoded: any)=>{
      this.current_id = decoded.decoded.id
      this.afterId();
    })

  }

  afterId(){

    this.profile.getProfileImage(this.current_id).subscribe(
      (img: any)=>{
        // console.log(img[0].image);
        if(img[0].image == ''){
          this.img = false;
        }else{
          this.img = true;
          this.profileImg = img[0].image;
        }
        
      }
    )
    this.global();
    // this.getFollow();
    
    
    //getting all users
    this.userservice
      .getSuggestedUsers(this.current_id)
      .subscribe((suggested: any) => {
        this.suggested_Users = suggested;
        this.suggestedNameID = suggested;
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

  current_id: any;
  suggested_Users!: any;
  suggested_User!: any;
  follow_body: any;
  follow: boolean = false;
  users: any = [];
  pushAllUsers: any = [];
  follo: any = [];
  sortUserPush: any = [];
  followe: any = [];
  suggestedNameID: any = [];
  followOpt: any = "follow";
  status: any = "false"
  userFollowing : any;

  spinnerStyle = Spinkit;
  dataGlobal!: any; //! to prevent problems when accepting data
  constructor(
    private userservice: SuggestedUsersService,
    private un: UnfollowService,
    private userSort: SortUsersService,
    private router: Router,
    private route: ActivatedRoute,
    private profile: ProfileService
  ) {}


  //select the profile you want to see suggested users
  seeProfileSU(userId: any){
    this.userservice.getOne(this.suggestedNameID[userId].id).subscribe((followed: any) => {
      this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(['/viewprofile'], {relativeTo: this.route})
      localStorage.setItem('count', this.suggestedNameID[userId].id);
    });
  }

  // see profile for the user you are following
  seeProfileFollow(userId: any){
    this.userservice.getOne(this.followe[userId].id).subscribe((followed: any) => {
      this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(['/viewprofile'], {relativeTo: this.route})
      localStorage.setItem('count', this.followe[userId].id);
    });
  }



  

  // follow other users
  followUsers(index: any) {
    //array for storing data to be passed at dabase
    const follower = {
      userid: this.current_id,
      followid: this.suggestedNameID[index].id,
    };

    //api to store the person you're  following
    this.userservice.followUsers(follower).subscribe((data) => {
     
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
    //get all users first on the follow list that you follow
    this.userSort.getFriends(this.current_id).subscribe((foll: any) => {
      for (let i = 0; i < foll[0].follow.length; i++) {
        const element = foll[0].follow[i];
        //getting the users that you are following and push them to an array
        this.userservice.getOne(element).subscribe((followed: any) => {
          for (let i = 0; i < followed.length; i++) {
            this.follo.push(followed[i]);

            // console.table(this.follo)

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
    //array of ppl that you are following
    pushed.forEach((element: any) => {
      pushUsers.forEach((newUser: any) => {
        //checking all users to sort users that you are following and not following
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

}
