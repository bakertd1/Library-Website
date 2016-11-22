import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable()
export class AccountService {
  private apiHostName = "https://library-api.azurewebsites.net";

  //emit an event when the user logs out
  isLoggedIn = new EventEmitter();

  constructor(private router: Router, private http: Http) { }

  //sends user credentials to api and returns a token if successful
  login(credentials) {
    let url = this.apiHostName + "/token";

    let body = "grant_type=password" + "&username=" + credentials.username + "&password=" + credentials.password;

    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options);
  }

  //sends user registration information to api
  register(registration) {
    let body = JSON.stringify(registration);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiHostName + "/api/Account/Register", body, { headers: headers });
  }

  //used to ensure email uniqueness
  //send email to the api
  //api responds with true if that user already exists 
  //or false if that user does not already exist
  checkEmail(email: string) {
    let url = this.apiHostName + "/api/Account/UsernameExists";
    let body = JSON.stringify(email);
    let headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(url, body, { headers: headers });
  }

  //Makes a request to the api to change user's password
  changePassword(changePasswordBindingModel) {
    let body = JSON.stringify(changePasswordBindingModel);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('access_token')
    });

    return this.http.post(this.apiHostName + "/api/Account/ChangePassword", body, { headers: headers });
  }

  //removes token information from local storage logs the user out
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
