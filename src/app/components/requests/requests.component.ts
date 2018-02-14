import { Component, OnInit } from '@angular/core';
import { MailService } from './../../services/mail.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  id:string;
  requests:any[];

  constructor(
    private mailService:MailService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.id = auth.uid;
        this.findRequests();
      } else {
        this.id = null;
      }
    });
  }

  findRequests() {
    this.mailService.getMailsFrom(this.id).subscribe(mail => {
      this.requests = mail;
    });
  }
}
