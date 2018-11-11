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

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    LoginComponent,
    SettingsComponent,
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
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
