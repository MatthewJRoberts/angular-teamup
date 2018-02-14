import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private flashMessagesService:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  showTos() {
    $('#tosModal2').modal('show');
  }

  onClickLogout() {
    this.authService.logout();
    this.flashMessagesService.show(`User Logged Out.`, {
      cssClass: 'ui message positive', timeout: 4000
    });
    this.router.navigate(['/']);
  }

}
