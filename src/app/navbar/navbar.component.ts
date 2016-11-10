import { Component } from '@angular/core';

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isCollapsed: boolean = false;
  username: String = "Dillon";
}
