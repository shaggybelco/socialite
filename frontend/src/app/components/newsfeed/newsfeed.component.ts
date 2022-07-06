import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    console.log("this is from NewsfeedComponent" , localStorage.getItem("user_id"))
  }

}
