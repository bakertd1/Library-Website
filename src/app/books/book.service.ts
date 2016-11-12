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
    const headers = new Headers({
      'Authorization': 'bearer ' + localStorage.getItem('access_token')
    });

    this.http.get("http://localhost:50010/api/books", { headers: headers }).map(
      (data: Response) => data.json()
    ).subscribe(
      (data: Book[]) => {
        this.books = data;
        this.booksChanged.emit(this.books);
      }
    );
  }

  getBook(id: number) {
    const headers = new Headers({
      'Authorization': 'bearer ' + localStorage.getItem('access_token')
    });

    this.http.get("http://localhost:50010/api/books/" + id, { headers: headers }).map(
      (data: Response) => data.json()
    ).subscribe(
      (data: Book) => {
        this.booksChanged.emit(data);
      }
    )
  }

  addBook(book: Book) {
    const body = JSON.stringify(book);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('access_token')
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
    const headers = new Headers({
      'Authorization': 'bearer ' + localStorage.getItem('access_token')
    });

    this.http.delete("http://localhost:50010/api/books/" + id, { headers: headers }).subscribe(
      (response: Response) => {
        this.books = this.books.filter(e => e.id !== id);
        this.booksChanged.emit(this.books);
      }
    );
  }

}
