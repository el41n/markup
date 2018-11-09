import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TextComponent } from "./text/text.component";
import { LoginComponent } from "./login/login.component";


const routes: Routes = [
  { path: '', redirectTo: 'MarkUp', pathMatch: 'full' },
  { path: 'MarkUp', component: TextComponent},
  { path: 'login', component: LoginComponent},
]

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}

