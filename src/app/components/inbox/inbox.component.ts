import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MailService } from './../../services/mail.service';
import { AuthService } from './../../services/auth.service';
import { Mail } from './../../models/Mail';
import { TeamService } from './../../services/team.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  id:string;
  mails:any[];

  showMail:any[];
  mailPerPage:number = 2;
  currentPage:number = 0;
  pageCount:number = 0;
  pageCountArr:number[];

  constructor(
    private route:ActivatedRoute,
    private mailService:MailService,
    private authService:AuthService,
    private teamService:TeamService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.id = auth.uid;
        this.findMail();
        //this.team.author_name = auth.displayName;
      } else {
        this.id = null;
      }
    });
  }

  findMail() {
    this.mailService.getMailsTo(this.id).subscribe(mail => {
      this.mails = mail;
      this.pageMail();
    });
  }

  pageMail() {
    let updatedMail = [...this.mails];
    updatedMail = updatedMail.splice(this.currentPage * this.mailPerPage, this.mailPerPage);
    this.showMail = updatedMail;

    this.pageCount = Math.ceil(this.mails.length / this.mailPerPage);
    let uArr = [];
    for(let i = 0; i < this.pageCount; i++) {
      uArr.push(i);
    }
    this.pageCountArr = uArr;
  }

  editPageCount(type:string, num = null) {
    switch(type) {
      case 'inc':
        if(this.currentPage != (this.pageCount - 1)) {       
          this.currentPage ++;
        }
        break;
      case 'dec':
        if(this.currentPage != 0) {
          this.currentPage --;
        }
        break;
      case 'set':
        this.currentPage = num;
        break;
      default:
        break;
    }
    this.pageMail();
  }

  onClickAcceptRequest(role) {
    let acceptRole = {
      role: role.role,
      user: role.from,
      user_email: role.fromEmail
    };
    if(!acceptRole) {
      return false;
    } 
    
    this.teamService.updateTeam(role.team, {accepted: [acceptRole]});
    this.mailService.removeMail(role.key);
  }

  onClickDeclineRequest(role) {
    this.mailService.removeMail(role.key);
  }
}
