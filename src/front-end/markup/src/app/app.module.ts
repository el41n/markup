import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";

import { MarkdownModule } from 'ngx-markdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TextComponent } from './text/text.component';
import { LoginComponent } from './login/login.component';

import { AuthenticationService} from "./services/authentication.service";
import { FileService } from "./services/file.service";

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    LoginComponent,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
