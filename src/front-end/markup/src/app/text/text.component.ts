import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { MarkdownService } from "ngx-markdown";
import {sanitizeUrl} from "@angular/core/src/sanitization/sanitization";
import { FileService } from "../services/file.service";
import { UserService } from "../services/user.service";

import { User } from "../models/user";
import { File } from "../models/file";

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
  user: User = null;
  file: Array<File>;
  workingFile: File;
  selectedLevel;


  createFileDownload(text: string): void {
    let blob = new Blob([text], {type: 'text/plain'});
    this.url = window.URL.createObjectURL(blob);
    console.log('clicked');
  }

  saveHTML(): void {
    this.fullFileName = this.fileName + '.html';
    let text = this.markdownService.compile(this.rawText);
    this.createFileDownload(text);
  }

  saveMD(): void {
    this.fullFileName = this.fileName + '.md';
    this.createFileDownload(this.rawText);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

    save(oField) {
      console.log(oField._data);
      console.log(this.markdownService.compile(this.rawText));
      let t = this.markdownService.compile(this.rawText);
      this.createFileDownload(t);
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

  createFile() {
    this.workingFile = new File();
    this.workingFile.title = 'Title';
    this.workingFile.text = '';
  }

  loadFile() {
    alert(this.selectedLevel.title);
    this.fileService.loadFile(this.selectedLevel.id)
      .subscribe((data) => this.workingFile = data);
    this.update();
  }

  saveFile() {
    if (this.workingFile.id) {
      this.fileService.updateFile(this.workingFile)
        .subscribe();
    }
    else {
      this.fileService.createFile(this.workingFile).subscribe();
    }
    this.update();
  }

  deleteFile() {
    if (this.workingFile.id) {
      this.fileService.deleteFile(this.workingFile).subscribe();
    }
    this.createFile();
    this.update();
  }

  loadUser(): void {
    this.userService.loadUser()
      .subscribe((data) => this.user=data);
  }

  constructor(private markdownService: MarkdownService,
              private sanitizer: DomSanitizer,
              private fileService: FileService,
              private userService: UserService) {}

  ngOnInit() {
    this.createFile();
    this.update();
  }

  update() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.key) {
        this.fileService.list()
          .subscribe((data) => this.file=data);
        this.loadUser();
      }
  }
}
