import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TextComponent } from "./text/text.component";
import { LoginComponent } from "./login/login.component";
import { SettingsComponent } from "./settings/settings.component";
import { RegisterComponent } from "./register/register.component";


const routes: Routes = [
  { path: '', redirectTo: 'MarkUp', pathMatch: 'full' },
  { path: 'MarkUp', component: TextComponent },
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'signin', component: RegisterComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}

