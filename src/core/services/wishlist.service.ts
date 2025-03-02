import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl = 'https://ecommerce.routemisr.com/api/v1';
  constructor(private http: HttpClient) { }

  getWishlist(): any {
    return this.http.get(this.baseUrl + '/wishlist');
  }

  addToWishlist(productId: string | undefined): any {
    return this.http.post(this.baseUrl + '/wishlist', { productId: productId });
  }


  removeFromWishlist(productId: string): any {
    return this.http.delete(this.baseUrl + '/wishlist/' + productId);
  }

}
