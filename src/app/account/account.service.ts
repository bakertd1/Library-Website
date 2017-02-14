import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

export class UserLogin {
  client_id: String;
  connection: String;
  grant_type: String;
  username: String;
  password: String;
  scope: String;
}

export class UserRegister {
  client_id: String;
  email: String;
  password: String;
  connection: String;
}

export class ChangePassword {
  client_id: String;
  email: String;
  connection: String;
}

@Injectable()
export class AccountService {
  private apiHostName = "https://bakertd1.auth0.com";
  private clientID = "2D5HKUELTp8IQpdE5b02NeDuqioldQcn";
  private connectionType = "Username-Password-Authentication";

  //emit an event when the user logs out
  isLoggedIn = new EventEmitter();

  constructor(private router: Router, private http: Http) { }

  //sends user credentials to Auth0 and returns a token if successful
  login(credentials) {
    let url = this.apiHostName + "/oauth/ro";

    let userLogin = new UserLogin();
    userLogin.client_id = this.clientID;
    userLogin.connection = this.connectionType;
    userLogin.grant_type = "password";
    userLogin.username = credentials.username;
    userLogin.password = credentials.password;
    userLogin.scope = "openid profile email";


    let body = JSON.stringify(userLogin);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({ headers: headers });
    
    return this.http.post(url, body, options);
  }

  //sends user registration information to api
  register(registration) {
    let userRegister = new UserRegister();
    userRegister.client_id = this.clientID;
    userRegister.email = registration.email;
    userRegister.password = registration.password;
    userRegister.connection = this.connectionType;

    let body = JSON.stringify(userRegister);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiHostName + "/dbconnections/signup", body, { headers: headers });
  }

  isAdmin() {
    let header = new Headers({
      'Authorization': localStorage.getItem("token_type") + ' ' + localStorage.getItem("access_token")
    });

    return this.http.get(this.apiHostName + "/userinfo", { headers: header });
  }

  //Makes a request to the api to change user's password
  changePassword(email: String) {
    let changePassword = new ChangePassword();
    changePassword.client_id = this.clientID;
    changePassword.email = email;
    changePassword.connection = this.connectionType;

    let body = JSON.stringify(changePassword);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiHostName + "/dbconnections/change_password", body, { headers: headers }).catch(response => {
      return Observable.throw(response.json());
    });
  }

  //removes token information from local storage logs the user out
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('userName');
    localStorage.removeItem('is_admin');

    this.isLoggedIn.emit(false);

    this.router.navigate(['/login']);
  }
}
