// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // user base url
  userBaseUrl:"http://localhost:8082",
  // sign up url
  signupUrl : "/home/signup",
  // log in url
  loginUrl : "/home/auth",
  // log out url
  logoutUrl : "/home/logout",
  // user url
  addAddressUrl : "/user/addAddress",
  viewAddressUrl : "/user/getAddress",

  // product base url
  productBaseUrl:"http://localhost:8083",
  // product url
  productsUrl : "/user/getProducts",
  addProductUrl : "/admin/addProduct",
  deleteProductUrl : "/admin/delProduct",
  updateProductUrl : "/admin/updateProducts",

  // order cart base url
  orderBaseUrl:"http://localhost:8084",
  // cart url
  addToCartUrl : "/user/addToCart",
  viewCartUrl : "/user/viewCart",
  updateCartUrl : "/user/updateCart",
  deleteCartUrl: "/user/delCart",
  // order url
  viewOrderUrl : "/admin/viewOrders",
  updateOrderUrl : "/admin/updateOrder",
  placeOrderUrl : "/user/placeOrder"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error',  // Included with Angular CLI.
