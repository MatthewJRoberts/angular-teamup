import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private router:Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.user.email, this.user.password).then((res) => {
      this.flashMessagesService.show(`User Logged In.`, {
        cssClass: 'ui message positive', timeout: 4000
      });
      this.router.navigate(['/']);
    }).catch((e) => {
      this.flashMessagesService.show(`Failed to login: ${e.message}`, {
        cssClass: 'ui message negative', timeout: 4000
      });
      this.router.navigate(['/login']);
    });
  }
  
}
