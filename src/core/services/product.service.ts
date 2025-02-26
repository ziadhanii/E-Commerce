import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'https://ecommerce.routemisr.com/api/v1';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.baseUrl + '/products');
  }

  getProduct(id: string | null): Observable<any> {
    return this.http.get(this.baseUrl + '/products/' + id);
  }

  getCategories(): Observable<any> {
    return this.http.get(this.baseUrl + '/categories');
  }

}
