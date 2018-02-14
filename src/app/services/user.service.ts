import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { User } from './../models/User';

@Injectable()
export class UserService {
  usersRef: AngularFireList<any>;
  usersRefID: AngularFireList<any>;
  user: Observable<any>;

  constructor(
    private db: AngularFireDatabase
  ) { 
    this.usersRef = this.db.list('users');
  }

  getUser(id:string) {
    this.usersRefID = this.db.list('/users', ref => ref.orderByChild('userid').equalTo(id));
    this.user = this.usersRefID.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });
    return this.user;
  }

  newUser(user:User) {
    return this.usersRef.push(user);
  }

  updateUser(id:string, user:User) {
    return this.usersRef.update(id, user);
  }

  deleteUser(id:string) {
    this.usersRefID = this.db.list('/users', ref => ref.orderByChild('userid').equalTo(id));
    return this.usersRefID.remove(id);
  }

}
