import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    email: '',
    password: '',
    passwordConfirm: '',
    accepted: false
  };

  constructor(
    private authService: AuthService,
    private router:Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  showTos() {
    $('#tosModal1').modal('show');
  }

  onSubmit() {
    this.authService.register(this.user.email, this.user.password, this.user.passwordConfirm, this.user.accepted).then((res) => {
      this.flashMessagesService.show(`User registered.`, {
        cssClass: 'ui message positive', timeout: 4000
      });;
      this.router.navigate(['/']);
    }).catch((e) => {
      this.flashMessagesService.show(`Failed to register: ${e.message}`, {
        cssClass: 'ui message negative', timeout: 4000
      });
      this.router.navigate(['/register']);
    });
  }

}
