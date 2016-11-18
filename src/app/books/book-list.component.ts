import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Subscription } from 'rxjs/Rx';

import { Book } from './book';
import { Author } from '../authors/author';
import { BookService } from './book.service';
import { BookTableFilterPipe } from './booktable-filter.pipe';

@Component({
  selector: 'lib-book-list',
  templateUrl: './book-list.component.html'
})
export class BookListComponent { 
  private books: Book[] = [];
  private subscription: Subscription;
  private isAdmin = false;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "title";
  public sortOrder = "asc";
  @ViewChild('modal') modal: ModalComponent;
  private bookId: number;

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
    this.bookId = id;
    this.modal.open();
  }

  onDeleteConfirmed() {
    this.modal.close();
    this.BookService.deleteBook(this.bookId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
