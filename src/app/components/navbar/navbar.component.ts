import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean;
  loggedInUser:string;
  userId:string;

  constructor(
    private authService: AuthService,
    private router:Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
        this.userId = auth.uid;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onClickLogout() {
    this.authService.logout();
    this.flashMessagesService.show(`User Logged Out.`, {
      cssClass: 'ui message positive', timeout: 4000
    });
    this.router.navigate(['/']);
  }

}
