import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router'; 
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id:string;
  isProfile:boolean = false;

  constructor(
    private route:ActivatedRoute,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        if(auth.uid === this.id) {
          this.isProfile = true;
        }
      }
    });
  }
}
