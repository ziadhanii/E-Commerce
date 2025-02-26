import { CommonModule } from '@angular/common';
import { ProductService } from './../../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CutTextPipe } from '../../../core/pipe/cut-text.pipe';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, CommonModule, CutTextPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  addProduct(arg0: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }

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
