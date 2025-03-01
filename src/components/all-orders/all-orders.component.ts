import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css'],
  imports: [DatePipe, CommonModule]
})
export class AllOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.orderService.getUserOrders(userId).subscribe(
        (data: any[]) => {
          this.orders = data;
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
    }
  }
}
