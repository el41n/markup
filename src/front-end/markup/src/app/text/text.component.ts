import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  raw_text: string = 'avc';
  renderred_text: string;

  constructor() { }

  ngOnInit() {
  }

}
