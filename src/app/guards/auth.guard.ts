import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesService } from 'angular2-flash-messages'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router:Router,
        private afAuth:AngularFireAuth,
        private flashMessagesService:FlashMessagesService
    ) { }

    canActivate() :Observable<boolean> {
        return this.afAuth.authState.map(auth => {
            if(!auth) {
                this.flashMessagesService.show('Cannot access that page.', {
                    cssClass: "ui message negative",
                    timeout: 4000
                });
                this.router.navigate(['/']);
                return false;
            } else {
                return true;
            }
        });
    }
}