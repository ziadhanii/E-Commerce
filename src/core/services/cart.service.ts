import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = 'https://ecommerce.routemisr.com/api/v1';

  myToken: any = {
    token: localStorage.getItem('token')
  }

  constructor(private http: HttpClient) { }

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

}
