import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  private paymentForm: any;
  fileToUpload: File = null;
  imageUrl: string = "/assets/img/noimage.png";
  constructor(private api: ApiService, private route: Router) { }

  ngOnInit() {
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
  placeOrder(paymentType: any, amount: any, phone: any, image:any) {
    console.log("paymentType: ", paymentType.value);
    console.log("amount", amount.value);
    if (paymentType == undefined || paymentType == null || paymentType == '' || amount == undefined || amount == null || amount == 0) {
      alert("Please fill in the mandatory fields.");
    } else {
      this.api.placeOrder().subscribe(res => {
        console.log(res);
        console.log("orderid:: ",res.oblist[0].orderId);
        this.api.processOrder(paymentType.value, amount.value, phone.value = (amount.value === undefined) ? 0:amount.value, this.fileToUpload, res.oblist[0].orderId).subscribe(data => {
          console.log("process order:: ", data);
        })
      });
      this.route.navigate(['/home']);
    }
  }

}

