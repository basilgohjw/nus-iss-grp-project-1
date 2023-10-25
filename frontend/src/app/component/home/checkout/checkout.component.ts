import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { Address } from 'src/app/model/address';
import { Cart } from 'src/app/model/cart';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartlist: Cart[] = [];
  totalSum: number = 0;
  private paymentForm: any;
  fileToUpload: File = null;
  imageUrl: string = "/assets/img/noimage.png";
  
  model: Address = {
    address: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    phonenumber: ''

  };

  constructor(private api: ApiService, private route: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.api.getCartItems().subscribe(res => {
      this.cartlist = res.oblist;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
    });

    this.api.getAddress().subscribe(res => {
      if (res.map != null) {
        this.model = res.map;
      }
    }, err => {
      console.log(err);
    });
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  // addOrUpdateAddress() {
  //   this.api.addOrUpdateAddress(this.model).subscribe(res => {
  //     console.log(res);
  //     this.route.navigate(['/home']);
  //   });
  // }
  placeOrder(paymentType: any, amount: any, phone: any) {
    console.log("paymentType: ", paymentType.value);
    console.log("amount", amount.value);
    console.log("phone", phone.value);
    if (paymentType == undefined || paymentType == null || paymentType == '' || amount == undefined || amount == null || amount == 0) {
      alert("Please fill in the mandatory fields.");
    } else {
      this.api.placeOrder().subscribe(res => {
        console.log(res);
        console.log("orderid:: ",res.oblist[0].orderId);
        this.api.processOrder(paymentType.value, amount.value, phone.value = (phone.value === undefined) ? 0:phone.value, this.fileToUpload, res.oblist[0].orderId).subscribe(data => {
          console.log("process order:: ", data);
          this.api.getCartItems().subscribe(res2 => {
            this.cartlist = res2.oblist;
            this.api.cartAmount = this.cartlist.length;
          });
          this.snackBar.open('Order placed successfully.', 'Close', { duration: 3000 });
        })
      });
      this.route.navigate(['/home']);
    }
  }

}

