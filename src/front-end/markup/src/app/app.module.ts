import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { MarkdownModule } from 'ngx-markdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TextComponent } from './text/text.component';
import { LoginComponent } from './login/login.component';

import { AuthenticationService} from "./services/authentication.service";
import { FileService } from "./services/file.service";
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { UserService } from "./services/user.service";
import { SettingsComponent } from './settings/settings.component';
import { AlertService } from "./services/alert.service";
import { AlertComponent } from './alert/alert.component';
import {ErrorInterceptor} from "./helpers/error.interceptor";
import { RegisterComponent } from './register/register.component';
import { SharingComponent } from './sharing/sharing.component';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    LoginComponent,
    SettingsComponent,
    AlertComponent,
    RegisterComponent,
    SharingComponent,
    ResetComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    AuthenticationService,
    FileService,
    UserService,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
