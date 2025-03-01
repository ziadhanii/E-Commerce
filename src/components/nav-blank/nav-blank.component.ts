import { CartService } from './../../core/services/cart.service';
import { AuthService } from './../../core/services/auth.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-blank',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {

  constructor(private authService: AuthService, private cartService: CartService, private router: Router, private renderer: Renderer2) { }

  @HostListener('window:scroll')
  onScroll(): void {
    const isScrolled = window.scrollY > 300;
    this.renderer[isScrolled ? 'addClass' : 'removeClass'](this.nav.nativeElement, 'px-5');
    this.renderer[isScrolled ? 'addClass' : 'removeClass'](this.nav.nativeElement, 'shadow');
  }

  @ViewChild('nav') nav!: ElementRef;

  cartNum: number = 0;

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


