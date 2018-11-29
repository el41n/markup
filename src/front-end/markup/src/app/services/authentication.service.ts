import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post<any>(`http://127.0.0.1:8000/api/auth/login/`, {username: username, password: password})
      .pipe(map(user => {
        if (user && user.key) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  resetPassword(email: string) {
    return this.http.post(`http://127.0.0.1:8000/api/auth/password/reset/`, {email: email});
  }

  changePassword(password1, password2) {
    return this.http.post(`http://127.0.0.1:8000/api/auth/password/change/`, {
      new_password1: password1,
      new_password2: password2
    });
  }
}
