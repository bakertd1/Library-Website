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
export class BookListComponent implements OnInit, OnDestroy { 
  private bookId: number; //used to hold the book id to delete
  private books: Book[] = [];
  private isAdmin = false;  //used to control rendering of edit and delete buttons

  private subscription: Subscription;

  //information used by datatable
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "title";
  public sortOrder = "asc";

  //get reference to modal to confirm book delete
  @ViewChild('modal') modal: ModalComponent;

  constructor(private BookService: BookService) { }

  ngOnInit() {

    this.BookService.getBooks();

    this.subscription = this.BookService.booksChanged.subscribe(
      (books: Book[]) => {
        this.books = books; //update list of books when an event is emitted

        //determine whether user is an admin or not
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
