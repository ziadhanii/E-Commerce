import { CartService } from './../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { ProductService } from './../../../core/services/product.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CutTextPipe } from '../../../core/pipe/cut-text.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private renderer: Renderer2,
    private cartService: CartService,
    private toastr: ToastrService) { }

  productId: string | null = '';
  productDetails: any = {};

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get(`id`)
      }
    });

    this.productService.getProduct(this.productId).subscribe(
      {
        next: ({ data }) => {
          this.productDetails = data;
          console.log(data);

        }
      }
    );


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


  productDetailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }
}
