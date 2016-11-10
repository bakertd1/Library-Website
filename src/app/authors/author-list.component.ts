import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Author } from './author';
import { AuthorService } from './author.service';

@Component({
  selector: 'lib-author-list',
  templateUrl: './author-list.component.html'
})
export class AuthorListComponent implements OnInit, OnDestroy { 
  private authors: Author[] = [];
  private subscription: Subscription;

  constructor(private authorService: AuthorService) { }

  ngOnInit() {
    this.authorService.getAuthors();
    this.subscription = this.authorService.authorsChanged.subscribe(
      (data: Author[]) => this.authors = data
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
