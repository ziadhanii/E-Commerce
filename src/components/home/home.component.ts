import { CartService } from './../../core/services/cart.service';
import { CutTextPipe } from './../../core/pipe/cut-text.pipe';
import { CommonModule } from '@angular/common';
import type { product } from '../../core/interfaces/product';
import { ProductService } from './../../core/services/product.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import type { Category } from '../../core/interfaces/category';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../core/services/wishlist.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule, CutTextPipe, CarouselModule, RouterLink, SearchPipe, FormsModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  products: product[] = [];
  categories: Category[] = [];
  wishListData: any[] = [];

  search: string = '';

  constructor(private productService: ProductService, private cartService: CartService,
    private toastr: ToastrService, private renderer: Renderer2, private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        console.log(response.data);
        this.products = response.data;
      }
    });

    this.productService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
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
        this.toastr.success(response.message);
        this.renderer.removeAttribute(element, 'disabled');
        this.cartService.cartNumber.next(response.numOfCartItems);
      },
      error: (error) => {
        this.renderer.removeAttribute(element, 'disabled')
      }
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


  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 1000,
    navText: [
      '<i class="fa fa-chevron-left fa-2x"></i>',
      '<i class="fa fa-chevron-right fa-2x"></i>'
    ],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    navText: ['', ''],
    items: 1,
    nav: false
  }
}
