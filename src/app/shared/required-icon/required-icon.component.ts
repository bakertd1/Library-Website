import { Component } from '@angular/core';

@Component({
  selector: 'lib-required-icon',
  template: `
    <span class="lib-required-icon">*</span>
  `,
  styles: [`
  
    .lib-required-icon {
      color: red;
    }
  
  `]
})
export class RequiredIconComponent { }
