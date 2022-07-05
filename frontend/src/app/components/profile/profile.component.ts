import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCard } from '@angular/material/card';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  addImage(){
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _=>{
      let files = input.files;
      console.log(files);
    };
    input.click();
  }
  ngOnInit(): void {
  }

}
