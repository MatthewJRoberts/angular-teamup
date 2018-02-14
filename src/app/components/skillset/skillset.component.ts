import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-skillset',
  templateUrl: './skillset.component.html',
  styleUrls: ['./skillset.component.css']
})
export class SkillsetComponent implements OnInit {
  id:string;
  query = '';
  knownSkills = [
    'javascript',
    'java',
    'c#',
    'php',
    'android',
    'jquery',
    'python',
    'html',
    'c++',
    'ios',
    'css',
    'mysql',
    'sql',
    'asp.net',
    'ruby',
    'objectivec',
    'c',
    '.net',
    'angular',
    'json',
    'iphone',
    'r',
    'node.js',
    'ajax',
    'regex',
    'swift',
    'xml',
    'django',
    'linux',
    'wpf',
    'excel',
    'wordpress',
    'spring',
    'xcode',
    'windows',
    'mac',
    'eclipse',
    'html5',
    'git',
    'oracle',
    'bash',
    'mongodb',
    'vba',
    'facebook',
    'twitter',
    'google',
    'instagram',
    'snapchat',
    'postgresql',
    'apache',
    'nginx',
    'matlab',
    'laravel',
    'visualstudio',
    'css3',
    'swing',
    'linq',
    'react',
    'qt',
    'shell',
    'rest',
    'sqlite',
    'perl',
    'maven',
    'symfony',
    'azure',
    'aws',
    'tsql',
    'wcf',
    'xaml',
    'jsp',
    'opencv',
    'delphi',
    'firebase',
    'ubuntu',
    'express',
    'flash',
    'ssl',
    'curl',
    'docker',
    'opengl',
    'winapi',
    'unity',
    'unrealengine',
    'meteor',
    'github',
    'heroku',
    'redux',
    'plsql',
  ];
  showSkills = [];
  hasSkills = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.id = auth.uid;
        this.userService.getUser(this.id).subscribe(u => {
          this.hasSkills = u[0].skills;
        });
      } else {
        this.id = null;
      }
    });
    this.onChangeInput();
  }

  onChangeInput() {
    if(this.query === '' || this.query === undefined) {
      return this.showSkills = [];
    }

    const query = this.query.replace(/[^a-zA-Z0-9]/g,'').toLowerCase();
    let count = [];

    for(let i = 0; i < this.knownSkills.length; i++) {
      count.push({
        index: i, 
        name: this.knownSkills[i],
        compare: this.compareStrings(this.knownSkills[i], query)
      });
    }

    const sortedSpliced = count.sort(function(a, b) {
      return b.compare - a.compare;
    }).splice(0, 10);

    this.showSkills = sortedSpliced;
  }

  onClickSkill(s) {
    if(this.hasSkills) {
      for(let i = 0; i < this.hasSkills.length; i++) {
        if(this.hasSkills[i] == s) {
          return false;
        }
      }
    } else {
      this.hasSkills = [];
    }
    this.hasSkills.push(s);
  }

  onClickSkillDelete(s) {
    for(let i = 0; i < this.hasSkills.length; i++) {
      if(this.hasSkills[i] == s) {
        this.hasSkills.splice(i, 1);
      }
    }
  }

  onClickSkillSave() {
    this.userService.getUser(this.id).subscribe(u => {
      this.userService.updateUser(u[0].key, {skills: this.hasSkills});
      this.flashMessagesService.show(`Skills have been updated.`, {
        cssClass: 'ui message positive', timeout: 4000
      });;
    });
  }

  compareStrings(str0, str1) {
    let count = 0;
    for(let x = 0; x < str0.length; x++) {
      for(let y = 0; y < str1.length; y++) {
        if(str0[x] === str1[y]) {
          count++;
        }
      }
    }
    return count;
  }

}
