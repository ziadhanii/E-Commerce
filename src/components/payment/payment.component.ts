import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute, private cartService: CartService) { }
  cartId: string | null = '';
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
        console.log(this.cartId, 'cartId');

      },
    })
  }

  orderForm: FormGroup = new FormGroup({
    detail: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
  })

  handleForm(): void {
    console.log(this.orderForm.value);
    this.cartService.checkOut(this.cartId, this.orderForm.value).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status === 'success') {
          window.open(response.session.url, "_self");
        }

      }
    })
  }

}
