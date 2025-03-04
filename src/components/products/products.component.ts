import { ProductService } from './../../core/services/product.service';
import { product } from './../../core/interfaces/product';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from '../../core/pipe/cut-text.pipe';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { WishlistService } from '../../core/services/wishlist.service';


@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink, CutTextPipe, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {


  products: product[] = [];
  pageSize: number = 0;
  currentPage: number = 1;
  totalItems: number = 0;
  wishListData: any[] = [];

  constructor(private productService: ProductService, private cartService: CartService,
    private toastr: ToastrService, private renderer: Renderer2, private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        console.log(response.data);
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.totalItems = response.results;
      }
    });

    this.wishlistService.getWishlist().subscribe({
      next: (response) => {
        const newData = response.data.map((item: any) => item._id);
        this.wishListData = newData;
      }
    });
  }

  addProduct(id: any, element: HTMLButtonElement): void {
    this.renderer.setAttribute(element, 'disabled', 'true')
    this.cartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success(response.message, '', {
          positionClass: 'toast-top-right'
        });
        this.renderer.removeAttribute(element, 'disabled');
        this.cartService.cartNumber.next(response.numOfCartItems);
      },
      error: (error) => {
        this.renderer.removeAttribute(element, 'disabled')
      }
    });
  }

  pageChanged(event: any): void {
    this.productService.getProducts(event).subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.totalItems = response.results;
      },
    });
  }


  addProductToWishlist(id: string | undefined): void {
    this.wishlistService.addToWishlist(id).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.wishListData = response.data;
      }
    });
  }

  removeProductFromWishlist(id: string | undefined): void {
    this.wishlistService.removeFromWishlist(id).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.wishListData = response.data;
      }
    });
  }

}
