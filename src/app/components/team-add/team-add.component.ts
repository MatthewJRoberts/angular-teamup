import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { AuthService } from './../../services/auth.service';
import { Team } from '../../models/team';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-add',
  templateUrl: './team-add.component.html',
  styleUrls: ['./team-add.component.css']
})
export class TeamAddComponent implements OnInit {
  team:Team = {
    name: '',
    author_name: '',
    author_key: '',
    roles: [
      {
        role_name: '',
        role_desc: '',
        role_color: '',
        role_available: false
      }
    ]
  }

  constructor(
    private flashMessagesService:FlashMessagesService,
    private router:Router,
    private teamService:TeamService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.team.author_key = auth.uid;
        this.team.author_name = auth.email;
        //this.team.author_name = auth.displayName;
      } else {
        this.team.author_key = '';
        this.team.author_name = '';
      }
    });
  }

  onSubmit({value, valid}:{value: Team, valid:Boolean}) {
    value = this.team;
    if(!valid) {
      this.flashMessagesService.show('Invalid Submission.', {
        cssClass:'ui message negitive',
        timeout: 4000
      });
      this.router.navigate(['team-new']);
    } else {
      this.teamService.newTeam(value);
      this.flashMessagesService.show('New team created.', {
        cssClass:'ui message positive',
        timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

  onClickAddRole() {
    this.team.roles.push({
      role_name: '',
      role_desc: ''
    });
  }

  onClickRemoveRole(i) {
    this.team.roles.splice(i, 1);
  }

}
