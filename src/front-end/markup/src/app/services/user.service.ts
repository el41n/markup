import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from "../models/user";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  // list() {
  //   console.log('get');
  //   return this.http.get<File[]>('http://localhost:8000/api/files/');
  // }

  loadUser() {
    console.log('get user by id');
    return this.http.get<User>('http://localhost:8000/api/users/detail');
  }

  register(user: User) {
    return this.http.post(`http://localhost:8000/api/auth/registration`, user);
  }

  // createFile(file: File) {
  //   console.log('save file');
  //   return this.http.post('http://localhost:8000/api/files/', file);
  // }
  //
  // updateFile(file: File) {
  //   console.log('Update file');
  //   return this.http.put('http://localhost:8000/api/files/' + file.id, file);
  // }
  //
  // deleteFile(file: File) {
  //   console.log('delete file');
  //   return this.http.delete('http://localhost:8000/api/files/' + file.id);
  // }
}
