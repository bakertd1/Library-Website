import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Author } from './author';

@Injectable()
export class AuthorService {
  private apiHostName = "http://localhost:55783";
  authors: Author[] = [];

  //emit an event when the list of authors changes to trigger view update
  authorsChanged = new EventEmitter();

  constructor(private http: Http) { }

  //emits an event containing all authors retrieved from the api
  getAuthors() {
    const headers = new Headers({ 'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('id_token') });

    this.http.get(this.apiHostName + "/api/authors", { headers: headers }).map((data: Response) => data.json()).subscribe(
      (data: Author[]) => {
        this.authors = data;

        for(var i = 0; i < this.authors.length; i++) {
          this.authors[i].birthdate = this.changeDateToUTC(this.authors[i].birthdate);

          if(this.authors[i].deathdate !== null) {
            this.authors[i].deathdate = this.changeDateToUTC(this.authors[i].deathdate);
          }
        }

        this.authorsChanged.emit(this.authors);
      }
    );
  }

  //emits an event containing the specified author retrieved from the api
  getAuthor(id: number) {
    const headers = new Headers({ 'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('id_token') });

    this.http.get(this.apiHostName + "/api/authors/" + id, { headers: headers }).map((data: Response) => data.json()).subscribe(
      (data: Author) => {

        data.birthdate = this.changeDateToUTC(data.birthdate);

        if(data.deathdate !== null) {
          data.deathdate = this.changeDateToUTC(data.deathdate);
        }

        this.authorsChanged.emit(data);
      }
    )
  }

  //adds a new author to the api
  addAuthor(author: Author) {
    author.birthdate = this.changeDateToUTC(author.birthdate);

    if(author.deathdate !== null) {
      author.deathdate = this.changeDateToUTC(author.deathdate);
    }

    const body = JSON.stringify(author);

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('id_token')
    });

    this.http.post(this.apiHostName + "/api/authors", body, { headers: headers }).map( 
      (data: Response) => data.json()).subscribe(
      (data: Author) => {
        this.authors.push(data);
        this.authorsChanged.emit(this.authors);
      },
      error => {
        alert(error.json().message);
      }
    );
  }

  //updates the author in the api
  updateAuthor(author: Author) {
    author.birthdate = this.changeDateToUTC(author.birthdate);

    if(author.deathdate !== null) {
      author.deathdate = this.changeDateToUTC(author.deathdate);
    }

    const body = JSON.stringify(author);

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('id_token')
    });

    this.http.put(this.apiHostName + "/api/authors/" + author.id, body, { headers: headers }).map((data: Response) => data.json()).subscribe(
      (data: Author) => {

        //delete and readd the author to get the component to reload the view
        this.authors = this.authors.filter(e => e.id !== data.id);
        this.authors.push(data);

        this.authorsChanged.emit(this.authors);
      },
      error => {
        alert(error.json().message);
      }
    );
  }

  //deletes book from the api by specified book id
  deleteAuthor(id: number) {
    const headers = new Headers({ 'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('id_token') });

    this.http.delete(this.apiHostName + "/api/authors/" + id, { headers: headers }).subscribe(
      (response: Response) => {
        this.authors = this.authors.filter(e => e.id !== id);
        this.authorsChanged.emit(this.authors);
      },
      error => {
        alert(error.json().message);
      }
    );
  }

  //takes a localtime date and converts it to a utc time date
  //to prevent data inconsistencies between client and server
  private changeDateToUTC(date: Date) {
    let pubDate = new Date(date);
    return new Date(pubDate.getUTCFullYear(), pubDate.getUTCMonth(), pubDate.getUTCDate(),  pubDate.getUTCHours(), pubDate.getUTCMinutes(), pubDate.getUTCSeconds());
  }
}
