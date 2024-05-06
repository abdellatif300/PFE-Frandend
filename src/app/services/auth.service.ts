import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url_backend : String  = 'http://localhost:8080/api/v1/'

  requestHeader=new HttpHeaders(
    {"NO-Auth":"True"}
  );

  constructor( private http: HttpClient ) {}

  login(loginRequest: any): Observable<any> {
    return this.http.post(this.url_backend + "auth/authenticate", loginRequest,{headers:this.requestHeader})
  }

}
