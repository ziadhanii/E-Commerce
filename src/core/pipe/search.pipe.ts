import { product } from './../interfaces/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: product[], search: string): product[] {


    if (products) {
      return products.filter((product) => {
        return product.title.toLowerCase().includes(search.toLowerCase());
      });
    }

    return [];
  }
}
