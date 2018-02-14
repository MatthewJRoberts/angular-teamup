import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  id:string;
  user = {};

  constructor(
    private route:ActivatedRoute,
    private userService:UserService,
    private router:Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUser(this.id).subscribe(u => {
      if(!u || u.length === 0) {
        return this.router.navigate(['/']);
      }
      this.user = u[0];
    });
  }

}
