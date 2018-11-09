import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

import { File } from "../models/file";

@Injectable()
export class FileService {
  constructor(private http: HttpClient) {
  }

  list() {
    console.log('get');
    return this.http.get<File[]>('http://localhost:8000/api/files/');
  }

  loadFile(id: number) {
    console.log('get file by id');
    return this.http.get<File>('http://localhost:8000/api/files/' + id);
  }

  createFile(file: File) {
    console.log('save file');
    return this.http.post('http://localhost:8000/api/files/', file);
  }

  updateFile(file: File) {
    console.log('Update file');
    return this.http.put('http://localhost:8000/api/files/' + file.id, file);
  }

  deleteFile(file: File) {
    console.log('delete file');
    return this.http.delete('http://localhost:8000/api/files/' + file.id);
  }


}
