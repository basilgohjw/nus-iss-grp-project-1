import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Product } from 'src/app/model/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from 'src/app/model/cart';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  cartlist: Cart[] = [];
  constructor(private api: ApiService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.api.isAuthenticated) {
      this.api.getProducts().subscribe(res => {
        this.products = res.oblist;
      });
      this.api.getCartItems().subscribe(res => {
        this.cartlist = res.oblist;
        this.api.cartAmount = this.cartlist.length || 0;
      });
    }
  }

  addToCart(e) {
    this.api.addToCart(e).subscribe(res => {
      console.log(res);
      this.snackBar.open('Added to cart successfully.', 'Close', { duration: 3000 });
      this.cartlist = res.oblist;
      this.api.cartAmount = this.cartlist.length || 0;
    }, 
    err => {
      console.log("Error: ", err);
      this.snackBar.open('Failed to add item to cart. Please try again.', 'Close', { duration: 3000 });
    });
  }
}
