import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/model/product';
import { EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  imageSource: any;
  @Input() public product;

  @Output() productAddToCart: EventEmitter<Product> = new EventEmitter<Product>();
  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.convertBase64ToImage(this.product.productimage);
  }

  addToCart() {
    this.productAddToCart.emit(this.product);
  }

  convertBase64ToImage(base64Data: string) {
    // Sanitize the Base64 data
    const sanitizedData = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${base64Data}`);

    // Assign the sanitized data to the image source
    this.imageSource = sanitizedData;
  }
}
