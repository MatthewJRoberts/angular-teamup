import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams:any[];
  isLoggedIn:boolean = false;

  constructor(
    private teamService:TeamService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
      }
    });
  }

}
