import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AccountService {
  isLoggedIn = new EventEmitter();

  constructor(private router: Router, private http: Http) { }

  login(credentials) {
    let url = "http://localhost:50010/token";
    let body = "grant_type=password" + "&username=" + credentials.username + "&password=" + credentials.password;
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });

    this.http.post(url, body, options).subscribe(
      response => {
        localStorage.setItem('access_token', response.json().access_token);
        localStorage.setItem('expires_in', response.json().expires_in);
        localStorage.setItem('token_type', response.json().token_type);
        localStorage.setItem('userName', response.json().userName);
        this.isLoggedIn.emit(true);
        this.router.navigate(['/']);
      },
      error => {
        alert("Invalid username or password");
      }
    );
  }

  register(registration) {
    let body = JSON.stringify(registration);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.http.post("http://localhost:50010/api/Account/Register", body, { headers: headers }).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        alert("Unable to register");
      }
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('token_type');
    localStorage.removeItem('userName');
    this.isLoggedIn.emit(false);
    this.router.navigate(['/login']);
  }
}
