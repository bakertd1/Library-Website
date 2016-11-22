import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

import { Book } from './book';

@Injectable()
export class BookService {
  private apiHostName = "https://library-api.azurewebsites.net";
  books: Book[] = [];

  //emit an event when the list of books changes to trigger view update
  booksChanged = new EventEmitter();

  constructor(private http: Http) { }

  //emits an event containing all books retrieved from the api
  getBooks() {
    const headers = new Headers({ 'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token') });

    this.http.get(this.apiHostName + "/api/books", { headers: headers }).map((data: Response) => data.json()).subscribe(
      (data: Book[]) => {

        //update list of books
        this.books = data;

        //convert times to UTC to avoid timezone conversions from changing dates
        for(var i = 0; i < this.books.length; i++) {
          this.books[i].publicationDate = this.changeDateToUTC(this.books[i].publicationDate);
        }

        this.booksChanged.emit(this.books);
      }
    ); 
  }

  //emits an event containing the specified book retrieved from the api
  getBook(id: number) {
    const headers = new Headers({ 'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token') });

    this.http.get(this.apiHostName + "/api/books/" + id, { headers: headers }).map((data: Response) => data.json()).subscribe(
      (data: Book) => {
        data.publicationDate = this.changeDateToUTC(data.publicationDate);

        this.booksChanged.emit(data);
      }
    )
  }

  //adds a new book to the api
  addBook(book: Book) {
    book.publicationDate = this.changeDateToUTC(book.publicationDate);

    //convert book object to json object
    const body = JSON.stringify(book);

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
    });

    this.http.post(this.apiHostName + "/api/books", body, { headers: headers }).map(
      (data: Response) => data.json()).subscribe(
      (data: Book) => {
        this.books.push(data);
        this.booksChanged.emit(this.books);
      }
    );
  }

  //updates the book in the api
  updateBook(book: Book) {
    book.publicationDate = this.changeDateToUTC(book.publicationDate);

    const body = JSON.stringify(book);

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
    });

    this.http.put(this.apiHostName + "/api/books/" + book.id, body, { headers: headers }).map(
      (data: Response) => data.json()
    ).subscribe(
      (data: Book) => {

        //delete and readd the book to get the component to reload the view
        this.books = this.books.filter(e => e.id !== data.id);
        this.books.push(data);

        this.booksChanged.emit(this.books);
      }
    );
  }

  //deletes book from the api by specified book id
  deleteBook(id: number) {
    const headers = new Headers({
      'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
    });

    this.http.delete(this.apiHostName + "/api/books/" + id, { headers: headers }).subscribe(
      (response: Response) => {

        this.books = this.books.filter(e => e.id !== id);

        this.booksChanged.emit(this.books);
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
