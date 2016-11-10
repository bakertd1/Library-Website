import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

import { Book } from './book';

@Injectable()
export class BookService {
  books: Book[] = [];
  booksChanged = new EventEmitter();

  constructor(private http: Http) { }

  getBooks() {
    this.http.get("http://localhost:50010/api/books").map(
      (data: Response) => data.json()
    ).subscribe(
      (data: Book[]) => {
        this.books = data;
        this.booksChanged.emit(this.books);
      }
    );
  }

}
