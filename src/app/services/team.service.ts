import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

import { Team } from '../models/Team';

@Injectable()
export class TeamService {
  teamsRef: AngularFireList<any>;
  teams: Observable<any[]>;
  team: Observable<any>;

  userId: string;

  constructor(
    private db: AngularFireDatabase, 
    private authService: AuthService
  ) { 
    this.teamsRef = this.db.list('teams');
    this.teams = this.teamsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.userId = auth.uid;
      }
    });
  }

  getTeams() {
    return this.teams;
  }

  getTeam(id:string) {
    this.team = this.db.object('/teams/'+id).valueChanges();
    return this.team;
  }

  newTeam(team:Team) {
    var newPush = this.teamsRef.push(team);
  }

  updateTeam(id:string, team:Team) {
    return this.teamsRef.update(id, team);
  }

  removeTeam(id:string) {
    return this.teamsRef.remove(id);
  }

}
