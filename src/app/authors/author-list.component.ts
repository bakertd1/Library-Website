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
  private isAdmin = false;

  constructor(private authorService: AuthorService) { }

  ngOnInit() {
    this.authorService.getAuthors();
    this.subscription = this.authorService.authorsChanged.subscribe(
      (data: Author[]) => {
        this.authors = data;
        if(localStorage.getItem('is_admin') === 'true') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      }
    );
  }

  onDeleteClicked(id: number) {
    this.authorService.deleteAuthor(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
