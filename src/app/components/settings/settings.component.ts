import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  id:string;
  settings = {
    displayName: '',
    bio: ''
  };

  constructor(
    private userService:UserService,
    private authService:AuthService,
    private flashMessagesService:FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.id = auth.uid;
        this.userService.getUser(this.id).subscribe(user => {
          this.settings = {...user[0]};
        });
      } else {
        this.id = null;
      }
    });
  }

  onSubmit(f) {
    this.userService.getUser(this.id).subscribe(u => {
      this.userService.updateUser(u[0].key, {...this.settings});
      this.flashMessagesService.show(`Settings have been updated.`, {
        cssClass: 'ui message positive', timeout: 4000
      });;
    });
  }

}
