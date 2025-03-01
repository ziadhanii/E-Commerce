import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = 'https://ecommerce.routemisr.com/api/v1';
  constructor(private http: HttpClient) { }


  getUserOrders(id: string | null): Observable<any> {
    return this.http.get(this.baseUrl + '/orders/user/' + id);
  }
}
