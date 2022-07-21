import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { ActivatedRoute,Router } from '@angular/router';
import { SortUsersService } from 'src/app/services/sort-users.service';
import { SuggestedUsersService } from 'src/app/services/suggested-users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userservice: SuggestedUsersService,
    private profile: ProfileService,
    private uploadingPic: UploadService,
    private userSort: SortUsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  form: FormGroup = new FormGroup({
    userid: new FormControl(''),
    message: new FormControl(''),
  });

  uploadform!: FormGroup;

  msgto: string = '';

  name: any = {};
  userID: any = {};
  email:any ={};
  messages: any = {};
  posting: any = {};
  imgurl: any = {};
  imgpost: any = {};
  users: any = [];
  pushAllUsers: any = [];
  follo: any = [];
  sortUserPush: any = [];
  followe: any = [];
  suggestedNameID: any = [];
  numberOfFollowing: number = 0;
  numberOfFollowers: number = 0;

  ngOnInit(): void {

    console.log(localStorage.getItem('user_id'));

    this.userID = localStorage.getItem('user_id')

    this.profile
      .getAll(localStorage.getItem('user_id'))
      .subscribe((prof: any) => {
        this.name = prof[0].name;
        this.email= prof[0].email;
        console.log(this.name);
        console.log(this.userID);
      });

    this.profile
      .viewPost(localStorage.getItem('user_id'))
      .subscribe((prof: any) => {
        this.posting = prof;
        console.log(this.posting);

        for (let i = 0; i < prof.length; i++) {
          console.log(
            (this.name = prof[i].name),
            (this.messages = prof[i].message)
            (this.email = prof[i].email)
          );
        }
      });

    this.profile
      .getPic(localStorage.getItem('user_id'))
      .subscribe((imgstat: any) => {
        this.imgpost = imgstat;

        console.log(imgstat);

        for (let i = 0; i < imgstat.length; i++) {
          console.log(
            (this.name = imgstat[i].name),
            (this.messages = imgstat[i].caption),
            (this.imgurl = imgstat[i].image)
          );
        }
      });

      this.getFollow();
      this.getUsers();
      this.getFollowers();
  }
  async getUsers(){
    this.userSort.getall(this.userID).subscribe(
      {
        next: (user: any) =>{
          this.pushAllUsers = user;
          
          console.log('this are all users got ', this.pushAllUsers);
        },
        error: (err: any) =>{
          alert(err.message);
        }
      }
    )
    await this.pushAllUsers;
  }

  startSorting(pushed: any, pushUsers: any) {
    // console.log('starting ', pushed);
    const suggested: any = [];
    
    if(pushed.length != 0 && pushUsers.length === 0){
      this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(['/profile'], {relativeTo: this.route})
    }
    pushed.forEach((element: any) => {
      console.log("from foreach ",pushed[0].follow, " all userss inside", pushUsers)
      pushUsers.forEach((newUser: any) => {
        const isNotFollow = pushed[0].follow.includes(newUser.id);
        console.log("new users ", newUser.id," name ", newUser.name, isNotFollow)
        
        if(isNotFollow){
          this.numberOfFollowing++;
          console.log("followed by me: ",isNotFollow, " number: ",this.numberOfFollowing)
          
        }else{
          console.log("Not followed ",isNotFollow);
          suggested.push(newUser.id);
          this.suggestedNameID.push(newUser);
        }
      });
    });
    console.log("after push not followed ", suggested, " not followed by me:  ", this.suggestedNameID)
  }

  getFollow() {
    
    this.userSort.getFriends(this.userID).subscribe((foll: any) => {
      for (let i = 0; i < foll[0].follow.length; i++) {
        const element = foll[0].follow[i];
        this.userservice.getOne(element).subscribe((followed: any) => {
          for (let i = 0; i < followed.length; i++) {
            this.follo.push(followed[i]);
          }
        });
      }
      console.log("triying to get this all the time :", this.pushAllUsers)
      this.startSorting(foll, this.pushAllUsers);
    });
    
    return this.follo;
  }

  getFollowers(){
    this.profile.getFollowers(this.userID).subscribe(
      {
        next: (data: any) =>{
         this.numberOfFollowers = data[0].count;
        }
      }
    )
  }

  get f() {
    return this.form.controls;
  }

  post() {
    let postdata = {
      data: {
        userid: localStorage.getItem('user_id'),
        message: this.form.value.message,
      },
    };

    if (this.form.invalid) {
      alert('can not post empty text');
      return;
    } else if (postdata.data.userid != '' && postdata.data.message != '') {
      const formdata = new FormData();
   
        this.form.get('userid')?.setValue(localStorage.getItem('user_id'));
        
        formdata.append('userid', this.form.value.userid);
        formdata.append('caption', this.form.value.message)
        formdata.append('myfile',this.files);
  
       
        console.log('it does nothing', formdata);
  
        this.uploadingPic.uploading(formdata).subscribe(
          (data: any) => {
            alert('posted');
            console.log(data);
            this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
            this.router.onSameUrlNavigation = "reload";
            this.router.navigate(['/profile'], {relativeTo: this.route})
          },
          (err) => {
            alert(`failed to post: ${err.message}`);
          }
        );
    }
  }
  files: any = {};

  addImage() {
    let input = document.createElement('input');
    const formdata = new FormData();
    input.type = 'file';
    input.onchange = (_) => {
      this.files = input.files?.item(0);
      this.form.get('userid')?.setValue(localStorage.getItem('user_id'));

      formdata.append('userid', this.form.value.userid);
      formdata.append('caption', this.form.value.message);
      formdata.append('myfile', this.files);

      console.log('it does nothing', formdata);

      this.uploadingPic.uploading(formdata).subscribe(
        (data: any) => {
          alert('posted');
          console.log(data);
          this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
          this.router.onSameUrlNavigation = "reload";
          this.router.navigate(['/profile'], {relativeTo: this.route})
        },
        (err) => {
          alert(`failed to post: ${err.message}`);
        }
      );

      console.log(this.files);
    };

    input.click();
  }
}
