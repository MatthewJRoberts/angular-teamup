import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Mail } from './../models/Mail';

@Injectable()
export class MailService {
  mailsRef: AngularFireList<any>;
  mailsRefTo: AngularFireList<any>;
  mailsRefFrom: AngularFireList<any>;
  mails: Observable<any[]>;
  mailsTo: Observable<any[]>;
  mailsFrom: Observable<any[]>;
  mail: Observable<any>;

  constructor(
    private db: AngularFireDatabase
  ) { 
    this.mailsRef = this.db.list('mails');
    this.mails = this.mailsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });
  }

  getMails() {
    return this.mails;
  }

  getMail(id:string) {
    this.mail = this.db.object('/mails/'+id).valueChanges();
    return this.mail;
  }

  getMailsTo(id:string) {
    this.mailsRefTo = this.db.list('/mails', ref => ref.orderByChild('to').equalTo(id));
    this.mailsTo = this.mailsRefTo.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });
    return this.mailsTo;
  }

  getMailsFrom(id:string) {
    this.mailsRefFrom = this.db.list('/mails', ref => ref.orderByChild('from').equalTo(id));
    this.mailsFrom = this.mailsRefFrom.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });
    return this.mailsFrom;
  }

  newMail(mail:Mail) {
    return this.mailsRef.push(mail);
  }

  updateMail(id:string, mail:Mail) {
    return this.mailsRef.update(id, mail);
  }

  removeMail(id:string) {
    return this.mailsRef.remove(id);
  }

}
