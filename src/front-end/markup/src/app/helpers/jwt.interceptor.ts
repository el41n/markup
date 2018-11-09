import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        console.log('intercept');
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.key) {
            console.log('ok');
            console.log(currentUser.key);
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${currentUser.key}`
                }
            });
        }

        return next.handle(request);
    }
}
