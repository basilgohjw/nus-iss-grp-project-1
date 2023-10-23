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

@Injectable({
  providedIn: 'root'
})
export class ApiService {
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
  
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private http: HttpClient) {

  }
  
  // Register new users to the system
  register(user: User): Observable<any> {
    return this.http.post(environment.userBaseUrl+environment.signupUrl,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }
  
  // Validating user credentials
  login(user: User): Observable<any> {
    return this.http.post(environment.userBaseUrl+environment.loginUrl,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }

  logout(){
    this.http.get<any>(environment.userBaseUrl+environment.logoutUrl);
  }

  // Update Address 
  addOrUpdateAddress(adr: Address): Observable<any> {
    return this.http.post<any>(environment.userBaseUrl+environment.addAddressUrl, 
      adr, 
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }

  // Fetch address 
  getAddress(): Observable<any> {
    return this.http.get<any>(environment.userBaseUrl+environment.viewAddressUrl);
  }

  // Fetching all the products
  getProducts(): Observable<any> {
    return this.http.get<any>(environment.productBaseUrl+environment.productsUrl);
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
    return this.http.post<any>(environment.productBaseUrl+environment.addProductUrl, formData);
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
    return this.http.put<any>(environment.productBaseUrl+environment.updateProductUrl, formData);
  }

  // Delete Product
  deleteProduct( prodid: number) {
    return this.http.delete<any>(environment.productBaseUrl+environment.deleteProductUrl + "?productId=" + prodid);
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
    return this.http.post<any>(environment.orderBaseUrl+environment.addToCartUrl, this.cartRequestDTO);
  }

  // View cart items
  getCartItems(): Observable<any> {
    this.userDTO.name = this.storage.get("username");
    this.userDTO.email = this.storage.get("email");
    return this.http.post<any>(environment.orderBaseUrl+environment.viewCartUrl, this.userDTO);
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
    return this.http.put<any>(environment.orderBaseUrl+environment.updateCartUrl, this.cartRequestDTO);
  }

  // Delete cart Item 
  deleteCartItem(bufdid: number): Observable<any> {
    this.userDTO.name = this.storage.get("username");
    this.userDTO.email = this.storage.get("email");
    this.cartDTO.cartId = bufdid;
    this.cartRequestDTO.userDTO = this.userDTO;
    this.cartRequestDTO.cartDTO = this.cartDTO;
    console.log("this.cartRequestDTO: ", this.cartRequestDTO);
    return this.http.post<any>(environment.orderBaseUrl+environment.deleteCartUrl, this.cartRequestDTO);
  }

  // Fetch available orders placed
  getOrders() {
    return this.http.get<any>(environment.orderBaseUrl+environment.viewOrderUrl)
  }

  // Place the order 
  placeOrder(): Observable<any> {
    this.userDTO.name = this.storage.get("username");
    this.userDTO.email = this.storage.get("email");
    return this.http.post<any>(environment.orderBaseUrl+environment.placeOrderUrl, this.userDTO);
  }

  // Update status for order
  updateStatusForOrder( order: any) {
    const formData: FormData = new FormData();
    formData.append("orderId", order.orderId);
    formData.append("orderStatus", order.orderStatus);
    return this.http.post<any>(environment.orderBaseUrl+environment.updateOrderUrl, formData)
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
