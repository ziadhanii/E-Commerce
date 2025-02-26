import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {


  cartDetails: any = null;

  constructor(private cartService: CartService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (response) => {
        console.log(response);

        this.cartDetails = response.data
      }
    })
  }

  removeItem(productItem: string, element: HTMLButtonElement): void {

    this.renderer.setAttribute(element, 'disabled', 'true');

    this.cartService.removeFromCart(productItem).subscribe({
      next: (response: any) => {
        this.cartDetails = response.data
        this.renderer.removeAttribute(element, 'disabled');
        this.cartService.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        this.renderer.removeAttribute(element, 'disabled');
      }
    });
  }
  changeCount(count: number, id: string, element: HTMLButtonElement): void {

    if (count >= 1) {
      this.renderer.setAttribute(element, 'disabled', 'true');
      this.cartService.updateCartCount(id, count).subscribe({
        next: (response: any) => {
          console.log(response);
          this.cartDetails = response.data
          this.renderer.removeAttribute(element, 'disabled');
        },
        error: (err) => {
          this.renderer.removeAttribute(element, 'disabled');
        }
      })
    }

  }
  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: (response: any) => {
        if (response.message === "success") {
          this.cartDetails = null;
          this.cartService.cartNumber.next(0);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })


  }

}
