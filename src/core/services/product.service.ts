import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'https://ecommerce.routemisr.com/api/v1';
  constructor(private http: HttpClient) { }

  getProducts(pageNum: number = 1): Observable<any> {
    return this.http.get(this.baseUrl + `/products?page=${pageNum}`);
  }

  getProduct(id: string | null): Observable<any> {
    return this.http.get(this.baseUrl + '/products/' + id);
  }

  getCategories(): Observable<any> {
    return this.http.get(this.baseUrl + '/categories');
  }

  getCategory(id: string | null): Observable<any> {
    return this.http.get(this.baseUrl + '/categories/' + id);
  }

  getSubCategories(id: string | null): Observable<any> {
    return this.http.get(this.baseUrl + `/categories/${id}/subcategories`);
  }

}
