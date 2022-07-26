import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthorizeService } from 'src/app/services/authorize.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router, private authorize: AuthorizeService) { }

  ngOnInit(): void {
  }

  logout(){
    this.route.navigate(['/login']);
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
  }
}
