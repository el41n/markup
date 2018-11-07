import {Component, Input} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {NgxSmartModalService} from "ngx-smart-modal";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private sanitizer:DomSanitizer
  ){}
  title = 'MarkUp';
  name = 'Elchin';
  a = new Blob(["sdad"], {type: 'text/plain'});
  url = ""; // window.URL.createObjectURL(this.a);
  file_name = "pars.txt";


  save() {
    var a = new Blob(["sdad"], {type: 'text/plain'});
    this.url = window.URL.createObjectURL(a);
    console.log('clicked');

  };
  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}
}
