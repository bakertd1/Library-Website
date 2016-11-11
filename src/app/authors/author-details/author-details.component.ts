import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Author } from '../author';
import { Book } from '../../books/book';
import { AuthorService } from '../author.service';
import { BookService } from '../../books/book.service';

@Component({
  selector: 'lib-author-details',
  templateUrl: './author-details.component.html'
})
export class AuthorDetailsComponent implements OnInit, OnDestroy {
  private id: number;
  private books: Book[] = [];
  private author: Author = {
    firstName: "",
    lastName: "",
    birthdate: new Date(),
    deathdate: new Date()
  };
  private subscription: Subscription;

  constructor(private authorService: AuthorService, 
              private bookService: BookService, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.authorService.getAuthor(this.id);
    this.subscription = this.authorService.authorsChanged.subscribe(
      (data: Author) => {
        this.author = data;
        this.bookService.getBooks();
        this.books = this.bookService.books.filter(b => b.authorId === data.id);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
