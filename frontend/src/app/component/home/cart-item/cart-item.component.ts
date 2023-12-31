import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Cart } from 'src/app/model/cart';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  private auth: string;
  cartlist: Cart[] = [];
  totalSum: number = 0;
  constructor(public api: ApiService, private route: Router) {

  }

  ngOnInit() {
    this.api.getCartItems().subscribe(res => {
      this.cartlist = res.oblist;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
    });

  }

  updateCart(id:any, quantity:any) {
    this.api.updateCartItem(id.value, quantity.value).subscribe(res => {
      this.cartlist = res.oblist;
      this.api.cartAmount = this.cartlist.length || 0;
      this.totalSum = 0;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
    });
  }

  deleteItem(id:any) {
    this.api.deleteCartItem(id.value).subscribe(res => {
      this.cartlist = res.oblist;
      this.api.cartAmount = this.cartlist.length || 0;
      this.totalSum = 0;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
    });
  }

  placeOrder() {
    this.route.navigate(['/home/order/checkout']);
  }

}
