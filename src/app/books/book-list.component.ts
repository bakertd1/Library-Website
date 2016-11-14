import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Book } from './book';
import { Author } from '../authors/author';
import { BookService } from './book.service';

@Component({
  selector: 'lib-book-list',
  templateUrl: './book-list.component.html'
})
export class BookListComponent { 
  private books: Book[] = [];
  private subscription: Subscription;
  private isAdmin = false;

  constructor(private BookService: BookService) { }

  ngOnInit() {
    this.BookService.getBooks();
    this.subscription = this.BookService.booksChanged.subscribe(
      (books: Book[]) => {
        this.books = books;
        if(localStorage.getItem('is_admin') === 'true') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      }
    );
  }

  onDeleteClicked(id: number) {
    this.BookService.deleteBook(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
