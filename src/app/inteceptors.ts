import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor( private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (request.headers.get("No-Auth") === 'True') {
      return next.handle(request.clone());
     }
const jwtToken = localStorage.getItem('JWT');

      if (jwtToken) {
        request = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${jwtToken}`),
        });
      }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // if (error.status === 403) {
        //   this.router.navigate(['/login']);
        // }
        return throwError(error);
      })
    );
  }
}
