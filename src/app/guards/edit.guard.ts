import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesService } from 'angular2-flash-messages'

import { TeamService } from './../services/team.service';
import { Team } from './../models/Team';

@Injectable()
export class EditGuard implements CanActivate {
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

    constructor(
        private router:Router,
        private afAuth:AngularFireAuth,
        private flashMessagesService:FlashMessagesService,
        private teamService:TeamService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :Observable<boolean> {
        
        return this.afAuth.authState.map(auth => {
            if(!auth) {
                this.flashMessagesService.show('Cannot access that page', {
                    cssClass: "ui message negative",
                    timeout: 4000
                });
                this.router.navigate(['/']);
                return false;
            } else {
                const id = route.params['id'];
                this.teamService.getTeam(id).subscribe(team => {
                    this.team = team;
                    if(this.team.author_key != auth.uid) {
                        this.flashMessagesService.show('Cannot access that page', {
                            cssClass: "ui message negative",
                            timeout: 4000
                        });
                        this.router.navigate(['/']);
                        return false;
                    } else {
                        return true;
                    }
                });
                return true;
            }
        });
    }
}