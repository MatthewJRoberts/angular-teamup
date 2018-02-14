import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {
  id:string;
  team:Team = {
    name: '',
    author_name: 'Author #3',
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
    private teamService:TeamService,
    private router:Router,
    private route:ActivatedRoute,
    private flashMessagesService:FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.teamService.getTeam(this.id).subscribe(team => {
      this.team = team;
    })
  }

  onSubmit({value, valid}:{value: Team, valid:Boolean}) {
    value = this.team;
    if(!valid) {
      this.flashMessagesService.show('Invalid Submission.', {
        cssClass:'ui message negitive', timeout: 4000
      });
      this.router.navigate(['team-edit/'+this.id]);
    } else {
      this.teamService.updateTeam(this.id, value);
      this.flashMessagesService.show('Team Updated.', {
        cssClass:'ui message positive', timeout: 4000
      });
      this.router.navigate(['team-detail/'+this.id]);
    }
  }

  onClickDelete() {
    if(!this.id) {
      this.flashMessagesService.show('Failed to delete team.', {
        cssClass:'ui message negative', timeout: 4000
      });
      return this.router.navigate(['/team-edit/'+this.id]);
    }
    if(confirm("Are you sure you want to delete this team?")) {
      this.teamService.removeTeam(this.id);
      this.flashMessagesService.show('Team deleted.', {
        cssClass:'ui message positive', timeout: 4000
      });
      return this.router.navigate(['/']);
    }
    return false;
  }

}
