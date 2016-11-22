import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { AuthorService } from '../author.service';
import { RequiredIconComponent } from '../../shared/required-icon/required-icon.component';
import { Author } from '../author';

@Component({
  selector: 'lib-add-author',
  templateUrl: './add-author.component.html'
})
export class AddAuthorComponent {

  constructor(private router: Router, private authorService: AuthorService) { }

  onSubmit(form: FormGroup) {
    if(form.valid) {
      this.authorService.addAuthor(form.value);
      this.router.navigate(['/authors']);
    }
  }
}
