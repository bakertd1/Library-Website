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

  addBook(book: Book) {
    const body = JSON.stringify(book);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.http.post("http://localhost:50010/api/books", body, {
      headers: headers
    }).map(
      (data: Response) => data.json()
    ).subscribe(
      (data: Book) => {
        this.books.push(data);
        this.booksChanged.emit(this.books);
      }
    );
  }

  deleteBook(id: number) {
    this.http.delete("http://localhost:50010/api/books/" + id).subscribe(
      (response: Response) => {
        this.books = this.books.filter(e => e.id !== id);
        this.booksChanged.emit(this.books);
      }
    );
  }

}
