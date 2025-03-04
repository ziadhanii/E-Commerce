import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = 'https://ecommerce.routemisr.com/api/v1';

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private http: HttpClient) { }
  getLoggedUserCart(): Observable<any> {
    return this.http.get(this.baseUrl + '/cart')
  }
  addToCart(productId: string): Observable<any> {
    return this.http.post(this.baseUrl + '/cart',
      {
        productId: productId
      }
    )
  }

  removeFromCart(productId: string) {
    return this.http.delete(this.baseUrl + `/cart/${productId}`);
  }

  updateCartCount(productId: string, count: number) {
    return this.http.put(this.baseUrl + `/cart/${productId}`,
      {
        count: count
      });
  }

  clearCart() {
    return this.http.delete(this.baseUrl + '/cart');
  }

  checkOut(cartId: string | null, orderInfo: object): Observable<any> {
    return this.http.post(this.baseUrl + `/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: orderInfo
      }
    )
  }

  checkOutCash(cartId: string | null, orderInfo: object): Observable<any> {
    return this.http.post(this.baseUrl + `/orders/${cartId}`,
      {
        shippingAddress: orderInfo
      }
    )
  }

}

