import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { User } from '../model/user';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Address } from '../model/address';
import { environment } from 'src/environments/environment';
import { CartDTO } from '../dto/CartDTO';
import { CartRequestDTO } from '../dto/CartRequestDTO';
import { ProductDTO } from '../dto/ProductDTO';
import { UserDTO } from '../dto/UserDTO';
import { Payment } from '../model/payment';
import { API } from 'src/environments/apis';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  USER = 'USER';
  PRODUCT = 'PRODUCT';
  CART = 'CART';

  cartDTO: CartDTO = {
    cartId: null,
    cartQuantity: 0
  };

  productDTO: ProductDTO = {
    productId: null,
    productName: '',
    productPrice: 0,
    productQuantity: 0
  };

  userDTO: UserDTO = {
    name: '',
    email: ''
  };

  cartRequestDTO: CartRequestDTO = {
    userDTO: this.userDTO,
    cartDTO: this.cartDTO,
    productDTO: this.productDTO
  };

  cartAmount: number = 0;
  
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private http: HttpClient) {

  }
  
  getBaseApiURL(type) {
    if (type === this.USER) {
      if (environment.production) {
        return environment.userBaseUrl;
      }
    }

    if (type === this.PRODUCT) {
      if (environment.production) {
        return environment.productBaseUrl;
      }
    }

    if (type === this.CART) {
      if (environment.production) {
        return environment.orderBaseUrl;
      }
    }
  }

  // Register new users to the system
  register(user: User): Observable<any> {
    return this.http.post(this.getBaseApiURL(this.USER) + API.signupUrl,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' }
      });
  }
  
  // Validating user credentials
  login(user: User): Observable<any> {
    return this.http.post(this.getBaseApiURL(this.USER) + API.loginUrl,
      JSON.stringify(user));
  }

  logout(){
    this.http.get<any>(this.getBaseApiURL(this.USER) + API.logoutUrl);
  }

  // Update Address 
  addOrUpdateAddress(adr: Address): Observable<any> {
    return this.http.post<any>(this.getBaseApiURL(this.USER) + API.addAddressUrl, 
      adr, 
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }

  // Fetch address 
  getAddress(): Observable<any> {
    return this.http.get<any>(this.getBaseApiURL(this.USER) + API.viewAddressUrl);
  }

  // Fetching all the products
  getProducts(): Observable<any> {
    return this.http.get<any>(this.getBaseApiURL(this.PRODUCT) + API.productsUrl);
  }

  // Add product in the system
  addProduct( desc: string,
    quan: string, price: string, prodname: string, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("productname", prodname);
    formData.append("quantity", quan);
    formData.append("file", image);
    return this.http.post<any>(this.getBaseApiURL(this.PRODUCT) + API.addProductUrl, formData);
  }
  
  // Update Product for Logged Admin User
  updateProduct( desc: string,
    quan: string, price: string, prodname: string, image: File, productid: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("productname", prodname);
    formData.append("quantity", quan);
    formData.append("file", image);
    formData.append("productId", productid);
    return this.http.put<any>(this.getBaseApiURL(this.PRODUCT) + API.updateProductUrl, formData);
  }

  // Delete Product
  deleteProduct( prodid: number) {
    return this.http.delete<any>(this.getBaseApiURL(this.PRODUCT) + API.deleteProductUrl + "?productId=" + prodid);
  }

  // Add products to the cart
  addToCart(product: any): Observable<any> {
    this.userDTO.name = this.storage.get("username");
    this.userDTO.email = this.storage.get("email");
    this.productDTO.productId = product.productid;
    this.productDTO.productName = product.productname;
    this.productDTO.productPrice = product.price;
    this.productDTO.productQuantity = product.quantity;
    this.cartRequestDTO.userDTO = this.userDTO;
    this.cartRequestDTO.productDTO = this.productDTO;
    console.log("this.cartRequestDTO: ", this.cartRequestDTO);
    return this.http.post<any>(this.getBaseApiURL(this.CART) + API.addToCartUrl, this.cartRequestDTO);
  }

  // View cart items
  getCartItems(): Observable<any> {
    this.userDTO.name = this.storage.get("username");
    this.userDTO.email = this.storage.get("email");
    return this.http.post<any>(this.getBaseApiURL(this.CART) + API.viewCartUrl, this.userDTO);
  }

  // Update items quantity in the cart
  updateCartItem(prodid: number, quant: number): Observable<any> {
    this.userDTO.name = this.storage.get("username");
    this.userDTO.email = this.storage.get("email");
    this.cartDTO.cartId = prodid;
    this.cartDTO.cartQuantity = quant;
    this.cartRequestDTO.userDTO = this.userDTO;
    this.cartRequestDTO.cartDTO = this.cartDTO;
    console.log("this.cartRequestDTO: ", this.cartRequestDTO);
    return this.http.put<any>(this.getBaseApiURL(this.CART) + API.updateCartUrl, this.cartRequestDTO);
  }

  // Delete cart Item 
  deleteCartItem(bufdid: number): Observable<any> {
    this.userDTO.name = this.storage.get("username");
    this.userDTO.email = this.storage.get("email");
    this.cartDTO.cartId = bufdid;
    this.cartRequestDTO.userDTO = this.userDTO;
    this.cartRequestDTO.cartDTO = this.cartDTO;
    console.log("this.cartRequestDTO: ", this.cartRequestDTO);
    return this.http.post<any>(this.getBaseApiURL(this.CART) + API.deleteCartUrl, this.cartRequestDTO);
  }

  // Fetch available orders placed
  getOrders() {
    return this.http.get<any>(this.getBaseApiURL(this.CART) + API.viewOrderUrl);
  }

  // Place the order 
  placeOrder(): Observable<any> {
    this.userDTO.name = this.storage.get("username");
    this.userDTO.email = this.storage.get("email");
    return this.http.post<any>(this.getBaseApiURL(this.CART) + API.placeOrderUrl, this.userDTO);
  }

  // Place the order 
  processOrder(paymentType: any, amount: any, phone: any, image:any, orderId:any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("paymentType", paymentType);
    formData.append("amount", amount);
    formData.append("phone", phone);
    formData.append("orderId", orderId);
    formData.append("file", image);
    return this.http.post<any>(this.getBaseApiURL(this.CART) + API.processOrderUrl, formData);
  }

  // Update status for order
  updateStatusForOrder( order: any) {
    const formData: FormData = new FormData();
    formData.append("orderId", order.orderId);
    formData.append("orderStatus", order.orderStatus);
    return this.http.post<any>(this.getBaseApiURL(this.CART) + API.updateOrderUrl, formData);
  }

  // Authentication Methods 
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  storeToken(token: string, auth_type: string) {
    this.storage.set("auth_token", token);
    this.storage.set("auth_type", auth_type);
  }

  storeUserInfo(user: User) {
    this.storage.set("username", user.username);
    this.storage.set("email", user.email);
  }

  getAuthType(): string {
    if (this.storage.get("auth_type") !== null) {
      return this.storage.get("auth_type");
    }
    return null;
  }

  getToken() {
    return this.storage.get("auth_token");
  }

  removeToken() {
    this.storage.remove("auth_type");
    return this.storage.remove("auth_token");
  }

}
