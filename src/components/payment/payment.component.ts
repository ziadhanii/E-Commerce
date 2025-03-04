import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService, private toast: ToastrService, private router: Router) { }

  cartId: string | null = '';
  paymentMethod: string | null = '';

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
        console.log(this.cartId, 'cartId');
      },
    })

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.paymentMethod = params.get('paymentMethod');
      console.log('Payment Method:', this.paymentMethod);
    });
  }


  orderForm: FormGroup = new FormGroup({
    detail: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
  })

  handleForm(): void {
    if (!this.cartId) {
      console.error('Cart ID is missing');
      return;
    }

    const orderData = this.orderForm.value;

    if (this.paymentMethod === 'card') {
      this.cartService.checkOut(this.cartId, orderData).subscribe({
        next: (response) => {
          console.log('Card Payment:', response);
          if (response.status === 'success') {
            window.open(response.session.url, "_self");
            this.cartService.cartNumber.next(0);

          }
        },
        error: (err) => console.error('Error during card payment:', err)
      });
    } else if (this.paymentMethod === 'cash') {
      this.cartService.checkOutCash(this.cartId, orderData).subscribe({
        next: (response) => {
          console.log('Cash Payment:', response);
          this.cartService.cartNumber.next(0);
          this.router.navigate(['/allorders']);
          this.toast.success('Your cash order has been placed successfully!');
        },
        error: (err) => console.error('Error during cash payment:', err)
      });
    } else {
      console.error('Invalid payment method:', this.paymentMethod);
    }
  }
}


