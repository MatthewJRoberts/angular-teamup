import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';  

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamAddComponent } from './components/team-add/team-add.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthorComponent } from './components/author/author.component';
import { TeamEditComponent } from './components/team-edit/team-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { RequestsComponent } from './components/requests/requests.component';
import { SkillsetComponent } from './components/skillset/skillset.component';
import { InfoComponent } from './components/info/info.component';

import { TeamService } from './services/team.service';
import { AuthService } from './services/auth.service';
import { MailService } from './services/mail.service';
import { UserService } from './services/user.service';

import { LimitTo } from './pipes/limitTo';

import { AuthGuard } from './guards/auth.guard';
import { EditGuard } from './guards/edit.guard';
import { SettingsComponent } from './components/settings/settings.component';
import { MyteamsComponent } from './components/myteams/myteams.component';


const appRoutes:Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'team-new', component:TeamAddComponent, canActivate:[AuthGuard]},
  {path: 'team-detail/:id', component:TeamDetailComponent},
  {path: 'team-edit/:id', component:TeamEditComponent, canActivate:[EditGuard]},
  {path: 'profile/:id', component:ProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TeamsComponent,
    TeamAddComponent,
    TeamDetailComponent,
    FooterComponent,
    LimitTo,
    AuthorComponent,
    TeamEditComponent,
    ProfileComponent,
    InboxComponent,
    RequestsComponent,
    SkillsetComponent,
    InfoComponent,
    SettingsComponent,
    MyteamsComponent
  ],  
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(environment.firebase, 'team-up'),
    AngularFireAuthModule
  ],
  providers: [
    AngularFireDatabase,
    AngularFireDatabaseModule,
    TeamService,
    AuthService,
    MailService,
    UserService,
    AuthGuard,
    EditGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
