import { CartService } from './../../core/services/cart.service';
import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-blank',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {

  cartNum: number = 0;

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartNumber.subscribe({
      next: (num) => {
        this.cartNum = num;
      }
    });

    this.cartService.getLoggedUserCart().subscribe({
      next: (response) => {
        console.log(response);
        this.cartNum = response.numOfCartItems;
      }
    });
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}


