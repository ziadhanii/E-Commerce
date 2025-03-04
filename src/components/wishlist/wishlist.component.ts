import { CutTextPipe } from './../../core/pipe/cut-text.pipe';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, CommonModule, CutTextPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  wishListData: any[] = [];

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.displayWishListData();
  }

  displayWishListData(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (wishData: any) => {
        this.wishListData = wishData?.data ?? [];
        this.wishlistService.wishListNumber.next(this.wishListData.length);
      },
      error: (error: any) => {
        console.error('Error fetching wishlist data:', error);
        this.toastr.error('Failed to load wishlist.', 'Error');
        this.wishListData = [];
      }
    });
  }

  addProductToCart(productId: string): void {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        this.toastr.success(res.message || 'Product added to cart!');
        this.cartService.getLoggedUserCart().subscribe({
          next: (response) => {
            this.cartService.cartNumber.next(response?.numOfCartItems || 0);
          },
          error: () => {
            console.error('Failed to fetch cart items count.');
          }
        });

        this.deleteProductFromWishlist(productId);
      },
      error: (error: any) => {
        this.toastr.error('Failed to add product to cart.');
        console.error(error);
      }
    });
  }


  deleteProductFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: (res) => {
        this.toastr.success(res.message || 'Product removed from wishlist.');

        this.wishListData = this.wishListData.filter((product) => product.id !== productId);
        this.wishlistService.wishListNumber.next(this.wishListData.length);
      },
      error: (error: any) => {
        this.toastr.error('Failed to remove product from wishlist.');
        console.error(error);
      }
    });
  }

}
