import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { MarkdownService } from "ngx-markdown";
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
  url: string;
  fullFileName: string;
  user: User = null;
  file: Array<File>;
  workingFile: File;
  selectedLevel;


  createFileDownload(text: string): void {
    let blob = new Blob([text], {type: 'text/plain'});
    this.url = window.URL.createObjectURL(blob);
  }

  saveHTML(): void {
    this.fullFileName = this.workingFile.title + '.html';
    let text = this.markdownService.compile(this.workingFile.text);
    this.createFileDownload(text);
  }

  saveMD(): void {
    this.fullFileName = this.workingFile.title + '.md';
    this.createFileDownload(this.workingFile.text);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  save(oField) {
    let t = this.markdownService.compile(this.workingFile.text);
    this.createFileDownload(t);
  }

   addSymbols(oField, symbols: string): void {
    if (oField.selectionStart || oField.selectionStart == '0') {
       let caretPos = oField.selectionStart;
       this.workingFile.text = this.workingFile.text.slice(0, caretPos) + symbols
         + this.workingFile.text.slice(caretPos);
    }
  }

  makeBold(oField): void {
    this.addSymbols(oField, "** **");
  }

  makeItalic(oField): void {
    this.addSymbols(oField, "* *");
  }

  makeHeader(oField): void {
    this.addSymbols(oField, "###");
  }

  createFile() {
    this.workingFile = new File();
    this.workingFile.title = 'Title';
    this.workingFile.text = '';
  }

  loadFile() {
    this.fileService.loadFile(this.selectedLevel.id)
      .subscribe((data) => this.workingFile = data);
    this.update();
  }

  saveFile() {
    if (this.workingFile.id) {
      this.fileService.updateFile(this.workingFile)
        .subscribe((next) => {}, error1 => {}, () => this.update() );
    }
    else {
      this.fileService.createFile(this.workingFile)
        .subscribe((next) => {}, (error) => {}, () => this.update());
    }
  }

  deleteFile() {
    if (this.workingFile.id) {
      this.fileService.deleteFile(this.workingFile)
        .subscribe((next) => {}, (error) => {}, () => this.update());
    }
    this.createFile();
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

  update(): void {
    console.log('updated');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.key) {
        this.fileService.list()
          .subscribe((data) => this.file=data);
        this.loadUser();
      }
  }
}
