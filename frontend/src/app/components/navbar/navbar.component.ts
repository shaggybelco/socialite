import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.route.navigate(['/login']);
    localStorage.removeItem('user_id');
  }
}
