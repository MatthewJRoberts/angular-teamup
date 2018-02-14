import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';


@Injectable()
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) { }

  login(email:string, password:string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(user => resolve(user), err => reject(err));
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  register(email:string, password:string, passwordConfirm:string, tosAccepted:boolean) {
    return new Promise((resolve, reject) => {
      if(tosAccepted != true) {
        return reject("Please accept the Terms of Service Agreement.");
      }
      if(password != passwordConfirm) {
        return reject("Passwords do not match.");
      }
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(user => {

          this.userService.newUser({userid: user.uid, email: user.email});

          resolve(user);
        }, err => {
          reject(err);
        });
    });
  }

  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }

}
