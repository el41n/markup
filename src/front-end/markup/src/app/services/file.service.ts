import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { File } from "../models/file";

@Injectable()
export class FileService {
  constructor(private http: HttpClient) {
  }

  list() {
    console.log('get');
    return this.http.get<File[]>('http://localhost:8000/api/file/');
  }

  loadFile(id: number) {
    console.log('get file by id');
    return this.http.get<File>('http://localhost:8000/api/file/' + id);
  }

  createFile(file: File) {
    console.log('save file');
    return this.http.post('http://localhost:8000/api/file/', file);
  }

  updateFile(file: File) {
    console.log('Update file');
    return this.http.put('http://localhost:8000/api/file/' + file.pk, file);
  }

  deleteFile(file: File) {
    console.log('delete file');
    return this.http.delete('http://localhost:8000/api/file/' + file.pk);
  }


}
