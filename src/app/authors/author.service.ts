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

}
