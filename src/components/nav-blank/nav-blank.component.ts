import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-blank',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {

  constructor(private authService: AuthService, private router: Router) { }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}

