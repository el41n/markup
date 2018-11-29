import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

import {Permission} from "../models/permission";
import {RequestMethod, RequestOptions} from "@angular/http";

@Injectable()
export class SharingService {
  constructor(private http: HttpClient) {
  }

  addPermission(permission: Permission) {
    return this.http.patch('http://localhost:8000/api/permissions/', permission);
  }

  deletePermission(permission: Permission) {
    let options = new RequestOptions({
      body: JSON.stringify(permission),
      method: RequestMethod.Delete
    });

    return this.http.request('delete', 'http://localhost:8000/api/permissions/', {body: permission});
  }
}

