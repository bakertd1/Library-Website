import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

import { Book } from './book';

@Injectable()
export class BookService {
  private apiHostName = "https://library-api.azurewebsites.net";
  books: Book[] = [];
  booksChanged = new EventEmitter();

  constructor(private http: Http) { }

  getBooks() {
    const headers = new Headers({
      'Authorization': 'bearer ' + localStorage.getItem('access_token')
    });

    this.http.get(this.apiHostName + "/api/books", { headers: headers }).map(
      (data: Response) => data.json()
    ).subscribe(
      (data: Book[]) => {
        this.books = data;

        for(var i = 0; i < this.books.length; i++) {
          let pubDate = new Date(this.books[i].publicationDate);
          this.books[i].publicationDate = new Date(pubDate.getUTCFullYear(), pubDate.getUTCMonth(), pubDate.getUTCDate(),  pubDate.getUTCHours(), pubDate.getUTCMinutes(), pubDate.getUTCSeconds());
        }

        this.booksChanged.emit(this.books);
      }
    );
  }

  getBook(id: number) {
    const headers = new Headers({
      'Authorization': 'bearer ' + localStorage.getItem('access_token')
    });

    this.http.get(this.apiHostName + "/api/books/" + id, { headers: headers }).map(
      (data: Response) => data.json()
    ).subscribe(
      (data: Book) => {

        let pubDate = new Date(data.publicationDate);
        data.publicationDate = new Date(pubDate.getUTCFullYear(), pubDate.getUTCMonth(), pubDate.getUTCDate(),  pubDate.getUTCHours(), pubDate.getUTCMinutes(), pubDate.getUTCSeconds());

        this.booksChanged.emit(data);
      }
    )
  }

  addBook(book: Book) {
    let pubDate = new Date(book.publicationDate);
    book.publicationDate = new Date(pubDate.getUTCFullYear(), pubDate.getUTCMonth(), pubDate.getUTCDate(),  pubDate.getUTCHours(), pubDate.getUTCMinutes(), pubDate.getUTCSeconds());

    const body = JSON.stringify(book);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('access_token')
    });

    this.http.post(this.apiHostName + "/api/books", body, {
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

  updateBook(book: Book) {
    let pubDate = new Date(book.publicationDate);
    book.publicationDate = new Date(pubDate.getUTCFullYear(), pubDate.getUTCMonth(), pubDate.getUTCDate(),  pubDate.getUTCHours(), pubDate.getUTCMinutes(), pubDate.getUTCSeconds());

    const body = JSON.stringify(book);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('access_token')
    });

    this.http.put(this.apiHostName + "/api/books/" + book.id, body, { headers: headers }).map(
      (data: Response) => data.json()
    ).subscribe(
      (data: Book) => {
        this.books = this.books.filter(e => e.id !== data.id);
        this.books.push(data);
        this.booksChanged.emit(this.books);
      }
    );
  }

  deleteBook(id: number) {
    const headers = new Headers({
      'Authorization': 'bearer ' + localStorage.getItem('access_token')
    });

    this.http.delete(this.apiHostName + "/api/books/" + id, { headers: headers }).subscribe(
      (response: Response) => {
        this.books = this.books.filter(e => e.id !== id);
        this.booksChanged.emit(this.books);
      }
    );
  }

}
