import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Category } from '../../core/interfaces/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.productService.getCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = response.data;
      }
    });

  }

}
