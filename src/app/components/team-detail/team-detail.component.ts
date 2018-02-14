import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { AuthService } from '../../services/auth.service';
import { MailService } from './../../services/mail.service';
import { Team } from '../../models/team';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  isLoggedIn:boolean;
  id:string;
  authorId:string;
  team:Team = {
    key: '001',
    name: 'Default Name',
    desc: 'Lorem ispum dolar est...',
    author_name: 'Author #7',
    author_key: '007',
    roles: [
      {
        role_name: 'One',
        role_desc: 'one',
        role_color: 'blue',
        role_available: true
      }
    ]
  };
  mailSent = false;
  mail = {
    team: '',
    team_name: '',
    role: '',
    message: '',
    from: '',
    fromEmail: '',
    to: ''
  };

  constructor(
    private teamService:TeamService,
    private authService: AuthService,
    private mailService: MailService,
    private router:Router,
    private route:ActivatedRoute,
    private flashMessagesService:FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.teamService.getTeam(this.id).subscribe(team => {
      this.team = team;
      this.mail.to = team.author_key;
      this.authorId = team.author_key;
      this.mail.team_name = team.name;
      this.mail.team = this.id;
    });

    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
        this.mail.from = auth.uid;
        this.mail.fromEmail = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onSubmit(value) {
    if(this.mail.role == '') {
      return false;
    }
    this.mailService.newMail(this.mail);
    this.mailSent = true;
  }

}
