import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AroundMeComponent } from './around-me/around-me.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserInfoComponent } from './user-info/user-info.component';

export const ROUTES: Routes = [
  {path: 'around-me', component: AroundMeComponent},
  {path: 'user-info', component: UserInfoComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/around-me', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  exports: [ROUTES]
})
export class AppRoutesModule {}
