import { Routes } from '@angular/router';
import { authGuard } from '../core/guard/auth.guard';

export const routes: Routes = [
  //blank
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('../layouts/blank-layout/blank-layout.component').then(m => m.BlankLayoutComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('../components/home/home.component').then(m => m.HomeComponent), title: 'Home' },

      { path: 'cart', loadComponent: () => import('../components/cart/cart.component').then(m => m.CartComponent), title: 'Cart' },

      { path: 'products', loadComponent: () => import('../components/products/products.component').then(m => m.ProductsComponent), title: 'Products' },

      { path: 'productdetails/:id', loadComponent: () => import('../components/products/product-details/product-details.component').then(m => m.ProductDetailsComponent), title: 'Product Details' },

      { path: 'brands', loadComponent: () => import('../components/brands/brands.component').then(m => m.BrandsComponent), title: 'Brands' },

      { path: 'categories', loadComponent: () => import('../components/categories/categories.component').then(m => m.CategoriesComponent), title: 'Categories' },
      { path: 'payment/:id', loadComponent: () => import('../components/payment/payment.component').then(m => m.PaymentComponent), title: 'Payment' },
      { path: 'allorders', loadComponent: () => import('../components/all-orders/all-orders.component').then(m => m.AllOrdersComponent), title: 'All Orders' },
      { path: 'forget-password', loadComponent: () => import('../components/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent), title: 'Forget Password' }
    ]
  },
  //auth

  {
    path: '',
    loadComponent: () => import('../layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('../components/login/login.component').then(m => m.LoginComponent), title: 'Login' },
      { path: 'register', loadComponent: () => import('../components/register/register.component').then(m => m.RegisterComponent), title: 'Register' },
      { path: 'forget-password-auth', loadComponent: () => import('../components/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent), title: 'Forget Password' }
    ]
  },

  //Not-Found
  { path: '**', loadComponent: () => import('../components/not-found/not-found.component').then(m => m.NotFoundComponent), title: 'Not Found' }
];
