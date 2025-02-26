import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = 'https://ecommerce.routemisr.com/api/v1';

  myToken: any = {
    token: localStorage.getItem('token')
  }

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private http: HttpClient) { }
  getLoggedUserCart(): Observable<any> {
    return this.http.get(this.baseUrl + '/cart', {
      headers: this.myToken
    })
  }
  addToCart(productId: string): Observable<any> {
    return this.http.post(this.baseUrl + '/cart',
      {
        productId: productId
      },
      {
        headers: this.myToken
      }
    )
  }

  removeFromCart(productId: string) {
    return this.http.delete(this.baseUrl + `/cart/${productId}`,
      {
        headers: this.myToken
      });
  }

  updateCartCount(productId: string, count: number) {
    return this.http.put(this.baseUrl + `/cart/${productId}`,
      {
        count: count
      },
      {
        headers: this.myToken
      });
  }

  clearCart() {
    return this.http.delete(this.baseUrl + '/cart',
      {
        headers: this.myToken
      });
  }

}
