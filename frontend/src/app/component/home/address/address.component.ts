import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/model/address';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  private addressForm: any;
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
    this.api.getAddress().subscribe(res => {
      if (res.map != null) {
        this.model = res.map;
      }
    }, err => {
      console.log(err);
    });
  }

  addOrUpdateAddress() {
    this.api.addOrUpdateAddress(this.model).subscribe(res => {
      console.log(res);
      this.snackBar.open('Address updated successfully.', 'Close', { duration: 3000 });
      this.route.navigate(['/home']);
    });
  }

}
