import { Component, Input, OnInit } from '@angular/core';
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
  @Input() message = '';
  
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
      });

    this.profile
      .viewPost(localStorage.getItem('user_id'))
      .subscribe((prof: any) => {
        this.posting = prof;
        console.log(this.posting);

        for (let i = 0; i < prof.length; i++) {
            this.name = prof[i].name
            this.messages = prof[i].message
            this.email = prof[i].email
        }
      });

    this.profile
      .getPic(localStorage.getItem('user_id'))
      .subscribe((imgstat: any) => {
        this.imgpost = imgstat;


        for (let i = 0; i < imgstat.length; i++) {
            this.name = imgstat[i].name
            this.messages = imgstat[i].caption
            this.imgurl = imgstat[i].image
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
        },
        error: (err: any) =>{
          alert(err.message);
        }
      }
    )
    await this.pushAllUsers;
  }

  startSorting(pushed: any, pushUsers: any) {
    const suggested: any = [];
    
    if(pushed.length != 0 && pushUsers.length === 0){
      this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(['/profile'], {relativeTo: this.route})
    }
    pushed.forEach((element: any) => {

      pushUsers.forEach((newUser: any) => {
        const isNotFollow = pushed[0].follow.includes(newUser.id);
        
        if(isNotFollow){
          this.numberOfFollowing++;          
        }else{
          suggested.push(newUser.id);
          this.suggestedNameID.push(newUser);
        }
      });
    });
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
      this.startSorting(foll, this.pushAllUsers);
    });
    
    return this.follo;
  }

  getFollowers(){
    this.profile.getFollowers(this.userID).subscribe(
      {
        next: (data: any) =>{
          this.numberOfFollowers = (data[0].count);
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


      this.uploadingPic.uploading(formdata).subscribe(
        (data: any) => {
          this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
          this.router.onSameUrlNavigation = "reload";
          this.router.navigate(['/profile'], {relativeTo: this.route})
        },
        (err) => {
          alert(`failed to post: ${err.message}`);
        }
      );
    };

    input.click();
  }
}
