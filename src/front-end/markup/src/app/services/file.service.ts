import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class FileService {
  constructor(private http: HttpClient) {
  }

  list(username: string, password: string) {
    console.log('get');
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Token cf69f23f22c738b68e56f7e410742d0d86cbf50c',
      })
    };
    return this.http.get('http://localhost:8000/api/files/', httpOptions);
  }
}
