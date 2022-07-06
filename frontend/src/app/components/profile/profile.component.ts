import { NgForOf, NgForOfContext } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCard } from '@angular/material/card';
import { ProfileService } from 'src/app/services/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private profile: ProfileService) { 
  }

  
  
  addImage(){
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _=>{
      let files = input.files;
      console.log(files);
    };
    input.click();
  }

  name: any = {};
  message: any = {}
  posting: any = {}
  
  ngOnInit(): void {
    console.log(localStorage.getItem("user_id"));
    this.profile.viewPost(localStorage.getItem("user_id")).subscribe(
      (prof: any) =>{
        
        this.posting = prof;
        const j = prof.length;
        console.log(this.posting);
        
        for (let i = 0; i < prof.length; i++) {
         
          console.log( this.name = prof[i].name,
            this.message = prof[i].message);
        }
        
        
        
      }
    )

    
  }

  getUserId(index:any){
    localStorage.setItem('allpost',JSON.stringify(this.name[index]))
  }

}
