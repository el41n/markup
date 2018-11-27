import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

import { Permission } from "../models/permission";

@Injectable()
export class SharingService {
  constructor(private http: HttpClient) {
  }

  addPermission(permission: Permission) {
    this.http.patch('http://localhost:8000/api/file/', permission);
  }

  deletePermission(permission: Permission) {
    this.http.delete('http://localhost:8000/api/file/');
  }
}

