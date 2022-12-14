import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NewsfeedComponent } from './components/newsfeed/newsfeed.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { ViewprofileComponent } from './components/viewprofile/viewprofile.component';
import { AuthGuard } from './gaurds/auth.guard'

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: AuthComponent},
  {path: 'newsfeed', component: NewsfeedComponent,canActivate:[AuthGuard]},
  {path: 'users', component: UsersComponent,canActivate:[AuthGuard]},
  {path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]},
  {path: 'viewprofile', component: ViewprofileComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
