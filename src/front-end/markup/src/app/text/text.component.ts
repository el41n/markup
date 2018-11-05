import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { MarkdownService } from "ngx-markdown";
import {sanitizeUrl} from "@angular/core/src/sanitization/sanitization";

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  rawText: string = 'avc';
  url: string;
  fileName: string = 'file';
  fullFileName: string;

  createFile(text: string): void {
    let blob = new Blob([text], {type: 'text/plain'});
    this.url = window.URL.createObjectURL(blob);
    console.log('clicked');
  }

  saveHTML(): void {
    this.fullFileName = this.fileName + '.html';
    let text = this.markdownService.compile(this.rawText);
    this.createFile(text);
  }

  saveMD(): void {
    this.fullFileName = this.fileName + '.md';
    this.createFile(this.rawText);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

    save(oField) {
      console.log(oField._data);
      console.log(this.markdownService.compile(this.rawText));
      let t = this.markdownService.compile(this.rawText);
      this.createFile(t);
      alert('Pleas');
    }

   getCaretPos(oField): void {
    if (oField.selectionStart || oField.selectionStart == '0') {
       let caretPos = oField.selectionStart;
       console.log("Tried");
       console.log(caretPos);
       this.rawText = this.rawText.slice(0, caretPos) + "***" + this.rawText.slice(caretPos);
    }


  }

  constructor(private markdownService: MarkdownService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
