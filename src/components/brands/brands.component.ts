import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  brands: any[] = [];
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.productService.getBrands().
      subscribe({
        next: (brands) => {
          this.brands = brands.data;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }


  selectedBrand: any = null;

  openBrandDetails(brand: any) {
    this.selectedBrand = brand;
    const dialog = document.querySelector('dialog');
    dialog?.showModal();
  }

  closeDialog(dialog: HTMLDialogElement) {
    dialog.close();
  }

}
