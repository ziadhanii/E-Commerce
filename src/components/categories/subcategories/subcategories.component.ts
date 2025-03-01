import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css'],
  imports: [CommonModule, DatePipe]
})
export class SubcategoriesComponent implements OnInit {
  CategoryId: string | null = '';
  subCategory: any = [];

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        if (params.has('id')) {
          this.CategoryId = params.get('id');
        }
      }
    });

    this.productService.getSubCategories(this.CategoryId).subscribe({

      next: (result) => {
        this.subCategory = result.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
