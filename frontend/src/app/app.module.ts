import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { Router, Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavigationComponent } from './component/navigation/navigation.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { AuthguardGuard } from './service/auth.guard';
import { AdminComponent } from './component/admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './component/home/product/product.component';
import { CartItemComponent } from './component/home/cart-item/cart-item.component';
import { AddressComponent } from './component/home/address/address.component';
import { EditItemComponent } from './component/admin/edit-item/edit-item.component';
import { OrderItemComponent } from './component/admin/order-item/order-item.component';
import { AuthInterceptor } from './service/auth.interceptor';
const appRoutes:Routes=[
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'admin',
    component: AdminComponent
  }
  ,
  {
    path:'home',
    component: HomeComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path:'home/cart',
    component: CartItemComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path:'home/address',
    component: AddressComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path:'admin/edit',
    component: EditItemComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path:'admin/order',
    component: OrderItemComponent,
    canActivate:[AuthguardGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    HomeComponent,
    CartItemComponent,
    AddressComponent,
    AdminComponent,
    EditItemComponent,
    OrderItemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    StorageServiceModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
