import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

import { Author } from './author';

@Injectable()
export class AuthorService {
  authors: Author[] = [];
  authorsChanged = new EventEmitter();

  constructor(private http: Http) { }

  getAuthors() {
    this.http.get("http://localhost:50010/api/authors").map(
      (data: Response) => data.json()
    ).subscribe(
      (data: Author[]) => {
        this.authors = data;
        this.authorsChanged.emit(this.authors);
      }
    );
  }

  addAuthor(author: Author) {
    const body = JSON.stringify(author);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.http.post("http://localhost:50010/api/authors", body, {
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

  deleteAuthor(id: number) {
    this.http.delete("http://localhost:50010/api/authors/" + id).subscribe(
      (response: Response) => {
        this.authors = this.authors.filter(e => e.id !== id);
        this.authorsChanged.emit(this.authors);
      }
    );
  }

}
