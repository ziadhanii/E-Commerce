import { Category } from './../../../core/interfaces/category';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-category-details',
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit {

  categoryId: string | null = '';
  categoryDetails: Category = {} as Category;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        if (params.has('id')) {
          this.categoryId = params.get('id');
        }

      }

    })
    this.productService.getCategory(this.categoryId).subscribe({
      next: (result) => {
        this.categoryDetails = result.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
