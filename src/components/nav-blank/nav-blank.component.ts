import { Component, OnInit, ElementRef, HostListener, ViewChild, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from './../../core/services/auth.service';
import { CartService } from './../../core/services/cart.service';
import { WishlistService } from './../../core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {

  @ViewChild('nav') nav!: ElementRef;

  cartNum: number = 0;
  wishListNumber: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.initializeCart();
    this.initializeWishlist();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const isScrolled = window.scrollY > 300;
    this.renderer[isScrolled ? 'addClass' : 'removeClass'](this.nav.nativeElement, 'px-5');
    this.renderer[isScrolled ? 'addClass' : 'removeClass'](this.nav.nativeElement, 'shadow');
  }

  private initializeCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (response) => {
        this.cartNum = response.numOfCartItems;
      }
    });

    this.cartService.cartNumber.subscribe({
      next: (num) => {
        this.cartNum = num;
      }
    });
  }

  private initializeWishlist(): void {
    this.wishlistService.getWishlist().subscribe(response => {
      this.wishlistService.wishListNumber.next(response?.data?.length ?? 0);
    });

    this.wishlistService.wishListNumber.subscribe(count => {
      this.wishListNumber = count;
    });
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
