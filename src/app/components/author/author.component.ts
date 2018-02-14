import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { UserService } from './../../services/user.service';
import { TeamService } from './../../services/team.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  id:string;
  team = {};
  user = {};

  constructor(
    private userService:UserService,
    private teamService:TeamService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.teamService.getTeam(this.id).subscribe(team => {
      this.team = team;

      this.userService.getUser(team.author_key).subscribe(u => {
        this.user = u[0];
      });
    });

    
  }

}
