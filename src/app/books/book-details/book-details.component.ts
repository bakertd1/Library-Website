import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Author } from '../../authors/author';
import { Book } from '../book';
import { AuthorService } from '../../authors/author.service';
import { BookService } from '../book.service';

@Component({
  selector: 'lib-book-details',
  templateUrl: './book-details.component.html'
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  private id: number;
  private book: Book = {
    title: "",
    authorId: 0,
    author: {
      id: 1,
      firstName: "",
      lastName: "",
      birthdate: new Date()
    },
    publisher: "",
    publicationDate: new Date(),
    numberOfPages: 0
  };
  private subscription: Subscription;

  constructor(private bookService: BookService,
              private authorService: AuthorService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.bookService.getBook(this.id);
    this.subscription = this.bookService.booksChanged.subscribe(
      (data: Book) => {
        this.book = data;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
