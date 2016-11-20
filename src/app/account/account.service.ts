import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable()
export class AccountService {
  isLoggedIn = new EventEmitter();

  constructor(private router: Router, private http: Http) { }

  login(credentials) {
    let url = "https://library-api.azurewebsites.net/token";
    let body = "grant_type=password" + "&username=" + credentials.username + "&password=" + credentials.password;
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });

    return this.http.post(url, body, options);
  }

  register(registration) {
    let body = JSON.stringify(registration);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post("https://library-api.azurewebsites.net/api/Account/Register", body, { headers: headers });
  }

  checkEmail(email: string) {
    let url = "https://library-api.azurewebsites.net/api/Account/UsernameExists";
    let body = JSON.stringify(email);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, body, { headers: headers });
  }

  changePassword(changePasswordBindingModel) {
    let body = JSON.stringify(changePasswordBindingModel);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('access_token')
    });

    return this.http.post("https://library-api.azurewebsites.net/api/Account/ChangePassword", body, { headers: headers });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('token_type');
    localStorage.removeItem('userName');
    localStorage.removeItem('is_admin');
    this.isLoggedIn.emit(false);
    this.router.navigate(['/login']);
  }
}
