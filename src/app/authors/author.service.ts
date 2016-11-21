import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Author } from './author';

@Injectable()
export class AuthorService {
  private apiHostName = "https://library-api.azurewebsites.net";
  authors: Author[] = [];
  authorsChanged = new EventEmitter();


  constructor(private http: Http) { }

  getAuthors() {
    const headers = new Headers({
      'Authorization': 'bearer ' + localStorage.getItem('access_token')
    });

    this.http.get(this.apiHostName + "/api/authors", { headers: headers }).map(
      (data: Response) => data.json()
    ).subscribe(
      (data: Author[]) => {
        this.authors = data;

        for(var i = 0; i < this.authors.length; i++) {
          let bdate = new Date(this.authors[i].birthdate);
          this.authors[i].birthdate = new Date(bdate.getUTCFullYear(), bdate.getUTCMonth(), bdate.getUTCDate(),  bdate.getUTCHours(), bdate.getUTCMinutes(), bdate.getUTCSeconds());

          if(this.authors[i].deathdate !== null) {
            let ddate = new Date(this.authors[i].deathdate);
            this.authors[i].deathdate = new Date(ddate.getUTCFullYear(), ddate.getUTCMonth(), ddate.getUTCDate(),  ddate.getUTCHours(), ddate.getUTCMinutes(), ddate.getUTCSeconds());
          }
        }

        this.authorsChanged.emit(this.authors);
      }
    );
  }

  getAuthor(id: number) {
    const headers = new Headers({
      'Authorization': 'bearer ' + localStorage.getItem('access_token')
    });

    this.http.get(this.apiHostName + "/api/authors/" + id, { headers: headers }).map(
      (data: Response) => data.json()
    ).subscribe(
      (data: Author) => {

        let bdate = new Date(data.birthdate);
          data.birthdate = new Date(bdate.getUTCFullYear(), bdate.getUTCMonth(), bdate.getUTCDate(),  bdate.getUTCHours(), bdate.getUTCMinutes(), bdate.getUTCSeconds());

        if(data.deathdate !== null) {
          let ddate = new Date(data.deathdate);
          data.deathdate = new Date(ddate.getUTCFullYear(), ddate.getUTCMonth(), ddate.getUTCDate(),  ddate.getUTCHours(), ddate.getUTCMinutes(), ddate.getUTCSeconds());
        }

        this.authorsChanged.emit(data);
      }
    )
  }

  addAuthor(author: Author) {
    let bdate = new Date(author.birthdate);
      author.birthdate = new Date(bdate.getUTCFullYear(), bdate.getUTCMonth(), bdate.getUTCDate(),  bdate.getUTCHours(), bdate.getUTCMinutes(), bdate.getUTCSeconds());

    if(author.deathdate !== null) {
      let ddate = new Date(author.deathdate);
      author.deathdate = new Date(ddate.getUTCFullYear(), ddate.getUTCMonth(), ddate.getUTCDate(),  ddate.getUTCHours(), ddate.getUTCMinutes(), ddate.getUTCSeconds());
    }

    const body = JSON.stringify(author);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('access_token')
    });

    this.http.post(this.apiHostName + "/api/authors", body, {
      headers: headers
    }).map( 
      (data: Response) => data.json()
    ).subscribe(
      (data: Author) => {
        this.authors.push(data);
        this.authorsChanged.emit(this.authors);
      }
    );
  }

  updateAuthor(author: Author) {
    let bdate = new Date(author.birthdate);
      author.birthdate = new Date(bdate.getUTCFullYear(), bdate.getUTCMonth(), bdate.getUTCDate(),  bdate.getUTCHours(), bdate.getUTCMinutes(), bdate.getUTCSeconds());

    if(author.deathdate !== null) {
      let ddate = new Date(author.deathdate);
      author.deathdate = new Date(ddate.getUTCFullYear(), ddate.getUTCMonth(), ddate.getUTCDate(),  ddate.getUTCHours(), ddate.getUTCMinutes(), ddate.getUTCSeconds());
    }

    const body = JSON.stringify(author);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('access_token')
    });

    this.http.put(this.apiHostName + "/api/authors/" + author.id, body, { headers: headers }).map(
      (data: Response) => data.json()
    ).subscribe(
      (data: Author) => {
        //this.authors.find(a => a.id == author.id)[0] = data;
        this.authors = this.authors.filter(e => e.id !== data.id);
        this.authors.push(data);
        this.authorsChanged.emit(this.authors);
      }
    );
  }

  deleteAuthor(id: number) {
    const headers = new Headers({
      'Authorization': 'bearer ' + localStorage.getItem('access_token')
    });

    this.http.delete(this.apiHostName + "/api/authors/" + id, { headers: headers }).subscribe(
      (response: Response) => {
        this.authors = this.authors.filter(e => e.id !== id);
        this.authorsChanged.emit(this.authors);
      }
    );
  }

}
