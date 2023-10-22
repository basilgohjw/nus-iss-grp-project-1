import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  product: Product = {
    productid: 0,
    description: '',
    price: 0,
    productname: '',
    quantity: 0,
    productimage: null
  };
  products: Product[] = [];
  fileToUpload: File = null;
  auth: string;
  prodid: string;
  imageUrl: string = "/assets/img/noimage.png";

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
    if (this.api.isAuthenticated) {
      this.auth = this.api.getToken();
      this.api.getProducts().subscribe(
        res => {
          res.oblist.forEach(pro => {
            if (pro.productid == this.prodid) {
              this.product = pro;
              this.fileToUpload = pro.productimage;
            }
          });
        }
      );
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.prodid = params["user"];
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

  updateProd(desc:any, quan:any, price:any, prodname:any, image:any) {
    console.log(this.product.productid)
    this.api.updateProduct(desc.value, quan.value, price.value, prodname.value, this.fileToUpload, this.product.productid).subscribe(res => {
      console.log(res);
      if (res.status == '200') {
        alert("Product updated successfully.");
      } else {
        alert("Failed to update product.");
      }
    });
  }

  backtoAdminPage() {
    this.router.navigate(['/admin']);
  }

}
