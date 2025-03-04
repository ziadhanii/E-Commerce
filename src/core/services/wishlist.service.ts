import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl = 'https://ecommerce.routemisr.com/api/v1';
  wishListNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private http: HttpClient) { }

  getWishlist(): Observable<any> {
    return this.http.get(this.baseUrl + '/wishlist');
  }

  addToWishlist(productId: string | undefined): Observable<any> {
    this.wishListNumber.next(this.wishListNumber.value + 1);
    return this.http.post(this.baseUrl + '/wishlist', { productId: productId });
  }


  removeFromWishlist(productId: string | undefined): Observable<any> {
    this.wishListNumber.next(this.wishListNumber.value - 1);
    return this.http.delete(this.baseUrl + '/wishlist/' + productId);
  }

}
