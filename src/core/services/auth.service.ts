import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInformation: any;
  constructor(private http: HttpClient) { }
  baseUrl = 'https://ecommerce.routemisr.com/api/v1/auth';

  register(userData: object): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/signup', userData);
  }

  login(userData: object): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/signin', userData);
  }

  getUserId(): string | null {
    this.deCodeUserToken();
    return this.userInformation?.id || null;
  }

  deCodeUserToken(): void {
    const encodeToken = localStorage.getItem('token');
    if (encodeToken != null) {
      const decode = jwtDecode(encodeToken);
      this.userInformation = decode;
      console.log(decode);
    }
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.userInformation = null;
  }

  requestResetPassword(email: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/forgotPasswords', { email });
  }

  verifyResetCode(resetCode: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/verifyResetCode', { resetCode });
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/resetPassword', { email, newPassword });
  }
}
