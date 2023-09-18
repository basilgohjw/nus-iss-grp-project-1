(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/Components/admin/admin.component.css":
/*!******************************************************!*\
  !*** ./src/app/Components/admin/admin.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card-text{\r\n    height: 50px;\r\n    overflow: hidden;\r\n  }\r\n.mybtn{\r\n    margin-top: 15px;\r\n    margin-bottom: 15px;\r\n}\r\n.mybtnclr{\r\n    margin-left:10px;\r\n}"

/***/ }),

/***/ "./src/app/Components/admin/admin.component.html":
/*!*******************************************************!*\
  !*** ./src/app/Components/admin/admin.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navigation></app-navigation>\n<div class=\"container\">\n        <div class=\"row\">\n                <div class=\"col-12\">\n                        <button class=\"mybtn btn btn-secondary\" (click)=\"show()\" *ngIf=\"!showAdd\">Click to Add</button>\n                        <button class=\"mybtn btn btn-secondary\" (click)=\"hide()\" *ngIf=\"showAdd\">Click to hide</button>\n                </div>\n        </div>\n        <form class=\"form-horizontal shadow p-3 mb-5 bg-white rounded \" #f=\"ngForm\" (ngSubmit)=\"f.form.valid && addProd(desc,quan,price,prodname,image)\"\n                *ngIf=\"showAdd\">\n                <div class=\"row\">\n                        <div class=\"col-6\">\n                                <div class=\"form-group\">\n                                        <input type=\"text\" class=\"form-control\" placeholder=\"Product Name\" #prodname\n                                                ngModel name=\"prodname\">\n                                </div>\n                                <div class=\"form-group\">\n                                        <textarea type=\"text\" class=\"form-control\" placeholder=\"description\" name=\"desc\"\n                                                #desc ngModel rows=\"5\"></textarea>\n                                </div>\n                                <div class=\"form-group\">\n                                        <input type=\"text\" class=\"form-control\" placeholder=\"quantity\" name=\"quan\" #quan\n                                                ngModel>\n                                </div>\n                                <div class=\"form-group\">\n                                        <input type=\"text\" class=\"form-control\" placeholder=\"price\" name=\"price\" #price\n                                                ngModel>\n                                </div>\n                                <div class=\"form-group\">\n                                        <input type=\"file\" class=\"form-control\" placeholder=\"Product Picture\" #image\n                                                accept=\"image/*\" name=\"image\"\n                                                (change)=\"handleFileInput($event.target.files)\">\n                                </div>\n                        </div>\n                        <div class=\"col-6\">\n                                <h4 class=\"text-center\">Image preview</h4>\n                                <img [src]=\"imageUrl\" style=\"width:400px;height: 300px;\">\n\n                        </div>\n                        \n                </div>\n                <div class=\"row\">\n                        <div class=\"col-6\">\n                                <input type=\"submit\" class=\" btn btn-primary\" value=\"Add Product\">\n                        </div>\n                </div>\n        </form>\n        <hr>\n        <div class=\"row\">\n                <div class=\"col-3 align-left\" *ngFor=\"let product of products\">\n                        <div class=\"card shadow p-3 mb-5 bg-white rounded\">\n                                <div class=\"card-body\">\n                                        <h5 class=\"card-title\">{{product.productname}}</h5>\n                                        <img src=\"data:image/png;base64,{{product.productimage}}\" class=\"img-responsive\"\n                                                height=\"150px\" width=\"200px\" alt=\"Image\">\n                                        <p class=\"card-text\"> {{product.description}}</p>\n                                        <input type=\"hidden\" value={{product.productid}} #prdid>\n                                        <div class=\"row\">\n                                                <div class=\"col-6\">\n                                                        <button class=\"btn btn-secondary\" (click)=\"edit(prdid)\">Edit</button>\n                                                </div>\n                                                <div class=\"col-6\">\n                                                        <button class=\"btn btn-danger\"\n                                                                (click)=\"delProd(prdid)\">Remove</button>\n                                                </div>\n                                        </div>\n                                </div>\n                        </div>\n                </div>\n        </div>\n</div>"

/***/ }),

/***/ "./src/app/Components/admin/admin.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/Components/admin/admin.component.ts ***!
  \*****************************************************/
/*! exports provided: AdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminComponent", function() { return AdminComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Service/api.service */ "./src/app/Service/api.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminComponent = /** @class */ (function () {
    function AdminComponent(api, router) {
        this.api = api;
        this.router = router;
        this.products = [];
        this.fileToUpload = null;
        this.showAdd = false;
        this.imageUrl = "/assets/img/noimage.png";
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.api.isAuthenticated) {
            this.auth = this.api.getToken();
            this.api.getProducts().subscribe(function (res) {
                _this.products = res.oblist;
            });
        }
    };
    AdminComponent.prototype.handleFileInput = function (file) {
        var _this = this;
        this.fileToUpload = file.item(0);
        var reader = new FileReader();
        reader.onload = function (event) {
            _this.imageUrl = event.target.result;
        };
        reader.readAsDataURL(this.fileToUpload);
    };
    AdminComponent.prototype.show = function () {
        this.showAdd = true;
    };
    AdminComponent.prototype.hide = function () {
        this.showAdd = false;
    };
    AdminComponent.prototype.addProd = function (desc, quan, price, prodname, image) {
        var _this = this;
        this.api.addProduct(desc.value, quan.value, price.value, prodname.value, this.fileToUpload).subscribe(function (res) {
            _this.products = res.oblist;
        });
    };
    AdminComponent.prototype.delProd = function (prodid) {
        var _this = this;
        this.api.deleteProduct(prodid.value).subscribe(function (res) {
            _this.products = res.oblist;
            _this.ngOnInit();
        });
    };
    AdminComponent.prototype.edit = function (prodid) {
        var navigationExtras = {
            queryParams: {
                "user": prodid.value
            }
        };
        this.router.navigate(["admin/edit"], navigationExtras);
    };
    AdminComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin',
            template: __webpack_require__(/*! ./admin.component.html */ "./src/app/Components/admin/admin.component.html"),
            styles: [__webpack_require__(/*! ./admin.component.css */ "./src/app/Components/admin/admin.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "./src/app/Components/admin/edit-item/edit-item.component.css":
/*!********************************************************************!*\
  !*** ./src/app/Components/admin/edit-item/edit-item.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/Components/admin/edit-item/edit-item.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/Components/admin/edit-item/edit-item.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navigation></app-navigation>\n<div class=\"container\">\n        <br>\n        <form class=\"form-horizontal shadow p-3 mb-5 bg-white rounded\" #f=\"ngForm\"\n                (ngSubmit)=\"f.form.valid && updateProd(desc,quan,price,prodname,image)\">\n                <div class=\"row\">\n                        <div class=\"col-6\">\n                                <div class=\"form-group\">\n                                        <input type=\"text\" class=\"form-control\" placeholder=\"Product Name\" #prodname\n                                                ngModel name=\"prodname\" [(ngModel)]=\"product.productname\">\n                                </div>\n                                <div class=\"form-group\">\n                                        <textarea type=\"text\" class=\"form-control\" placeholder=\"description\" name=\"desc\"\n                                                #desc ngModel [(ngModel)]=\"product.description\" rows=\"5\"></textarea>\n                                </div>\n                                <div class=\"form-group\">\n                                        <input type=\"text\" class=\"form-control\" placeholder=\"quantity\" name=\"quan\" #quan\n                                                ngModel [(ngModel)]=\"product.quantity\">\n                                </div>\n                                <div class=\"form-group\">\n                                        <input type=\"text\" class=\"form-control\" placeholder=\"price\" name=\"price\" #price\n                                                ngModel [(ngModel)]=\"product.price\">\n                                </div>\n                                <div class=\"form-group\">\n                                        <input type=\"file\" class=\"form-control\" placeholder=\"Product Picture\" #image\n                                                accept=\"image/*\" name=\"image\"\n                                                (change)=\"handleFileInput($event.target.files)\">\n                                </div>\n                        </div>\n                        <div class=\"col-3\">\n                                <p><b>Original Image</b></p>\n                                <img src=\"data:image/png;base64,{{product.productimage}}\"\n                                        style=\"width:70%;height: 60%;\">\n\n                        </div>\n                        <div class=\"col-3\">\n                                <p><b>New Image</b></p>\n                                <img [src]=\"imageUrl\" style=\"width:250px;height: 200px;\">\n\n                        </div>\n                </div>\n                <div class=\"row\">\n                        <div class=\"col-6\">\n                                <input type=\"submit\" class=\" btn btn-secondary\" value=\"Update Product\">\n                        </div>\n                </div>\n        </form>\n</div>"

/***/ }),

/***/ "./src/app/Components/admin/edit-item/edit-item.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/Components/admin/edit-item/edit-item.component.ts ***!
  \*******************************************************************/
/*! exports provided: EditItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditItemComponent", function() { return EditItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Service/api.service */ "./src/app/Service/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EditItemComponent = /** @class */ (function () {
    function EditItemComponent(route, api) {
        var _this = this;
        this.route = route;
        this.api = api;
        this.product = {
            productid: 0,
            description: '',
            price: 0,
            productname: '',
            quantity: 0,
            productimage: null
        };
        this.products = [];
        this.fileToUpload = null;
        this.imageUrl = "/assets/img/noimage.png";
        if (this.api.isAuthenticated) {
            this.auth = this.api.getToken();
            this.api.getProducts().subscribe(function (res) {
                res.oblist.forEach(function (pro) {
                    if (pro.productid == _this.prodid) {
                        _this.product = pro;
                        _this.fileToUpload = pro.productimage;
                    }
                });
            });
        }
    }
    EditItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.prodid = params["user"];
        });
    };
    EditItemComponent.prototype.handleFileInput = function (file) {
        var _this = this;
        this.fileToUpload = file.item(0);
        var reader = new FileReader();
        reader.onload = function (event) {
            _this.imageUrl = event.target.result;
        };
        reader.readAsDataURL(this.fileToUpload);
    };
    EditItemComponent.prototype.updateProd = function (desc, quan, price, prodname, image) {
        console.log(this.product.productid);
        this.api.updateProduct(desc.value, quan.value, price.value, prodname.value, this.fileToUpload, this.product.productid).subscribe(function (res) {
            console.log(res);
        });
    };
    EditItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edit-item',
            template: __webpack_require__(/*! ./edit-item.component.html */ "./src/app/Components/admin/edit-item/edit-item.component.html"),
            styles: [__webpack_require__(/*! ./edit-item.component.css */ "./src/app/Components/admin/edit-item/edit-item.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]])
    ], EditItemComponent);
    return EditItemComponent;
}());



/***/ }),

/***/ "./src/app/Components/admin/order-item/order-item.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/Components/admin/order-item/order-item.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/Components/admin/order-item/order-item.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/Components/admin/order-item/order-item.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navigation></app-navigation>\n<div class=\"container\">\n    <br>\n    <div class=\"row\">\n        <div class=\"col-6 align-left\" *ngFor=\"let order of orderlist\">\n            <div class=\"card shadow p-3 mb-5 bg-white rounded\">\n                <div class=\"card-body\">\n                    <div class=\"row\">\n                        <div class=\"col-6\">\n                            <p class=\"card-title\"><b>Order By:</b> {{order.orderBy}}</p>\n                            <p class=\"card-text\"><b>Status:</b> {{order.orderStatus}}</p>\n                        </div>\n\n                        <div class=\"col-6\">\n                            <button class=\"btn btn-secondary\" (click)=\"approve(order.orderId)\">Approve</button>\n                            <button style=\"margin-left: 10px;\" class=\"btn btn-secondary\" (click)=\"decline(order.orderId)\">Decline</button>\n                        </div>\n                    </div>\n                    <br>\n                    <h5>Order Details</h5>\n                    <div class=\"row\">\n                        <div class=\"col\" *ngFor=\"let buf of order.products\">\n                            <p class=\"card-title\"> {{buf.productname}}</p>\n                            <p class=\"card-text\"> Price : {{buf.price  | currency:'USD'}}</p>\n                            <p class=\"card-text\">Quantity: {{buf.quantity}}</p>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/Components/admin/order-item/order-item.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/Components/admin/order-item/order-item.component.ts ***!
  \*********************************************************************/
/*! exports provided: OrderItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderItemComponent", function() { return OrderItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Service/api.service */ "./src/app/Service/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrderItemComponent = /** @class */ (function () {
    function OrderItemComponent(route, api) {
        this.route = route;
        this.api = api;
        this.orderlist = [];
    }
    OrderItemComponent.prototype.ngOnInit = function () {
        this.auth = this.api.getToken();
        this.getOrderList();
    };
    OrderItemComponent.prototype.approve = function (orderid) {
        var _this = this;
        var order = {
            "orderId": orderid,
            "orderStatus": "Approved"
        };
        this.api.updateStatusForOrder(order).subscribe(function (res) {
            _this.getOrderList();
        });
    };
    OrderItemComponent.prototype.decline = function (orderid) {
        var _this = this;
        var order = {
            "orderId": orderid,
            "orderStatus": "Declined"
        };
        this.api.updateStatusForOrder(order).subscribe(function (res) {
            _this.getOrderList();
        });
    };
    OrderItemComponent.prototype.getOrderList = function () {
        var _this = this;
        this.api.getOrders().subscribe(function (res) {
            _this.orderlist = res.orderlist;
        });
    };
    OrderItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'order-item',
            template: __webpack_require__(/*! ./order-item.component.html */ "./src/app/Components/admin/order-item/order-item.component.html"),
            styles: [__webpack_require__(/*! ./order-item.component.css */ "./src/app/Components/admin/order-item/order-item.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]])
    ], OrderItemComponent);
    return OrderItemComponent;
}());



/***/ }),

/***/ "./src/app/Components/home/address/address.component.css":
/*!***************************************************************!*\
  !*** ./src/app/Components/home/address/address.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/Components/home/address/address.component.html":
/*!****************************************************************!*\
  !*** ./src/app/Components/home/address/address.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navigation></app-navigation>\n<div class=\"container \">\n    <br>\n    <div class=\"row\">\n        <div class=\"offset-2 col-6 \">\n            <form class=\"form-horizontal shadow p-3 mb-5 bg-white rounded\" #f=\"ngForm\" (ngSubmit)=\" addOrUpdateAddress()\" novalidate>\n                <div class=\"form-group\">\n                    <label class=\"control-label col-m-10\" for=\"address\">Address: </label>\n                    <div class=\"col-m-10\">\n                        <input type=\"text\" class=\"form-control\" name=\"address\" [(ngModel)]=\"model.address\" placeholder=\"Address\"/>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"control-label col-m-10\" for=\"city\">City: </label>\n                    <div class=\"col-m-10\">\n                        <input type=\"text\" class=\"form-control\" name=\"city\" [(ngModel)]=\"model.city\" placeholder=\"Atlanta\"/>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"control-label col-m-10\" for=\"state\">State: </label>\n                    <div class=\"col-m-10\">\n                        <input type=\"text\" class=\"form-control\" name=\"state\" [(ngModel)]=\"model.state\" placeholder=\"Georgia\"/>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                        <label class=\"control-label col-m-10\" for=\"country\">Country: </label>\n                        <div class=\"col-m-10\">\n                            <input type=\"text\" class=\"form-control\" name=\"country\" [(ngModel)]=\"model.country\" placeholder=\"US\"/>\n                        </div>\n                    </div>\n                <div class=\"form-group\">\n                    <label class=\"control-label col-m-10\" for=\"zipcode\">Zipcode: </label>\n                    <div class=\"col-m-10\">\n                        <input type=\"text\" type=\"number\" class=\"form-control\" name=\"zipcode\" [(ngModel)]=\"model.zipcode\" placeholder=\"22222\"/>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"control-label col-m-10\" for=\"phone\">Phone Number: </label>\n                    <div class=\"col-m-10\">\n                        <input type=\"number\" class=\"form-control\" name=\"phone\" [(ngModel)]=\"model.phonenumber\" placeholder=\"+12342223456\"/>\n                    </div>\n                </div>\n                <br />\n                <div class=\"form-group\">\n                    <div class=\"col-m-offset-2 col-m-4\">\n                        <button type=\"submit\" class=\"btn  btn-primary\" name=\"signup\">\n                            Update\n                        </button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/Components/home/address/address.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/Components/home/address/address.component.ts ***!
  \**************************************************************/
/*! exports provided: AddressComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddressComponent", function() { return AddressComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Service/api.service */ "./src/app/Service/api.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddressComponent = /** @class */ (function () {
    function AddressComponent(api, route) {
        this.api = api;
        this.route = route;
        this.model = {
            address: '',
            city: '',
            state: '',
            country: '',
            zipcode: '',
            phonenumber: ''
        };
    }
    AddressComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.api.getAddress().subscribe(function (res) {
            if (res.map != null) {
                _this.model = res.map;
            }
        }, function (err) {
            console.log(err);
        });
    };
    AddressComponent.prototype.addOrUpdateAddress = function () {
        var _this = this;
        this.api.addOrUpdateAddress(this.model).subscribe(function (res) {
            console.log(res);
            _this.route.navigate(['/home']);
        });
    };
    AddressComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-address',
            template: __webpack_require__(/*! ./address.component.html */ "./src/app/Components/home/address/address.component.html"),
            styles: [__webpack_require__(/*! ./address.component.css */ "./src/app/Components/home/address/address.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AddressComponent);
    return AddressComponent;
}());



/***/ }),

/***/ "./src/app/Components/home/cart-item/cart-item.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/Components/home/cart-item/cart-item.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/Components/home/cart-item/cart-item.component.html":
/*!********************************************************************!*\
  !*** ./src/app/Components/home/cart-item/cart-item.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navigation></app-navigation>\n<div class=\"container\">\n  <br>\n  <a routerLink=\"/home\" class=\"btn btn-primary\"><i class=\"fa fa-angle-left\"></i> Continue Shopping</a><br>\n  <p style=\"padding-top: 10px\"> To change Quantity, Edit Quantity and Click on Update button</p>\n  <table id=\"cart\" class=\"table table-hover table-condensed table-borderless\">\n    <thead>\n      <tr>\n        <th>Product</th>\n        <th>Price</th>\n        <th>Quantity</th>\n        <th>Subtotal</th>\n        <th></th>\n      </tr>\n    </thead>\n    <tr *ngFor=\"let cart of cartlist\">\n      <td>\n        {{cart.productname}}\n      </td>\n      <td>{{cart.price | currency:'USD'}}</td>\n      <td>\n\n        <div class=\"row\">\n          <div class=\"col-6\">\n            <input type=\"number\" value=\"{{cart.quantity}}\" #quant>\n            <input type=\"hidden\" value=\"{{cart.bufcartId}}\" #prod>\n          </div>\n          <div class=\"col-6\">\n            <button class=\"btn btn-info btn-sm\" (click)=\"updateCart(prod,quant)\">Update</button>\n          </div>\n        </div>\n      </td>\n      <td>\n        {{cart.quantity*cart.price | currency:'USD'}}\n\n      </td>\n      <td>\n        <button class=\"btn btn-info btn-sm\" (click)=\"deleteItem(prod)\">Delete</button>\n      </td>\n    </tr>\n  </table>\n\n  <div class=\"row\">\n    <div class=\"col-9\">Total Sum : {{totalSum | currency:'USD'}}</div>\n    <div class=\"offset-1 col-2\"><button type=\"button\" class=\"btn btn-primary align-right\" (click)=\"placeOrder()\">Checkout <i\n          class=\"fa fa-angle-right\"></i></button></div>\n\n  </div>\n\n</div>"

/***/ }),

/***/ "./src/app/Components/home/cart-item/cart-item.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/Components/home/cart-item/cart-item.component.ts ***!
  \******************************************************************/
/*! exports provided: CartItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartItemComponent", function() { return CartItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Service/api.service */ "./src/app/Service/api.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CartItemComponent = /** @class */ (function () {
    function CartItemComponent(api, route) {
        this.api = api;
        this.route = route;
        this.totalSum = 0;
    }
    CartItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.api.getCartItems().subscribe(function (res) {
            _this.cartlist = res.oblist;
            _this.cartlist.forEach(function (value) {
                _this.totalSum = _this.totalSum + (value.quantity * value.price);
            });
        });
    };
    CartItemComponent.prototype.updateCart = function (id, quantity) {
        var _this = this;
        this.api.updateCartItem(id.value, quantity.value).subscribe(function (res) {
            _this.cartlist = res.oblist;
            _this.cartlist.forEach(function (value) {
                _this.totalSum = _this.totalSum + (value.quantity * value.price);
            });
        });
    };
    CartItemComponent.prototype.deleteItem = function (id) {
        var _this = this;
        this.api.deleteCartItem(id.value).subscribe(function (res) {
            _this.cartlist = res.oblist;
            _this.cartlist.forEach(function (value) {
                _this.totalSum = _this.totalSum + (value.quantity * value.price);
            });
        });
    };
    CartItemComponent.prototype.placeOrder = function () {
        this.api.placeOrder().subscribe(function (res) {
            console.log(res);
        });
        this.route.navigate(['/home']);
    };
    CartItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-cart-item',
            template: __webpack_require__(/*! ./cart-item.component.html */ "./src/app/Components/home/cart-item/cart-item.component.html"),
            styles: [__webpack_require__(/*! ./cart-item.component.css */ "./src/app/Components/home/cart-item/cart-item.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], CartItemComponent);
    return CartItemComponent;
}());



/***/ }),

/***/ "./src/app/Components/home/home.component.css":
/*!****************************************************!*\
  !*** ./src/app/Components/home/home.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/Components/home/home.component.html":
/*!*****************************************************!*\
  !*** ./src/app/Components/home/home.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navigation></app-navigation>\r\n<div class=\"container\">\r\n  <br>\r\n  <div class=\"row\">\r\n    <div class=\"col-3 align-left\" *ngFor=\"let product of products\">\r\n      <app-product [product]=\"product\" (productAddToCart)=\"addToCart($event)\">Loading...</app-product>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/Components/home/home.component.ts":
/*!***************************************************!*\
  !*** ./src/app/Components/home/home.component.ts ***!
  \***************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Service/api.service */ "./src/app/Service/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = /** @class */ (function () {
    function HomeComponent(api) {
        this.api = api;
        this.products = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.api.isAuthenticated) {
            this.api.getProducts().subscribe(function (res) {
                _this.products = res.oblist;
            });
        }
    };
    HomeComponent.prototype.addToCart = function (e) {
        this.api.addToCart(e).subscribe(function (res) {
            console.log(res);
        });
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/Components/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/Components/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/Components/home/product/product.component.css":
/*!***************************************************************!*\
  !*** ./src/app/Components/home/product/product.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".myproduct {\r\n  margin-top: 20px;\r\n  margin-bottom: 20px;\r\n  background-color: rgb(205, 210, 212);\r\n}\r\n.card-text{\r\n  height: 50px;\r\n  overflow: hidden;\r\n}\r\n"

/***/ }),

/***/ "./src/app/Components/home/product/product.component.html":
/*!****************************************************************!*\
  !*** ./src/app/Components/home/product/product.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n        <div class=\"card-body\">\n                <h5 class=\"card-title\">{{product.productname}}</h5>\n                <img src=\"data:image/png;base64,{{product.productimage}}\" class=\"img-responsive\" height=\"150px\"\n                        width=\"200px\" alt=\"Image\">\n                <p class=\"card-text \"> {{product.description}}</p>\n                <button class=\"btn btn-primary\" style=\"text-align: right\" (click)=\"addToCart()\">Add to cart</button>\n        </div>\n</div>"

/***/ }),

/***/ "./src/app/Components/home/product/product.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/Components/home/product/product.component.ts ***!
  \**************************************************************/
/*! exports provided: ProductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductComponent", function() { return ProductComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProductComponent = /** @class */ (function () {
    function ProductComponent(http) {
        this.http = http;
        this.productAddToCart = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ProductComponent.prototype.ngOnInit = function () {
    };
    ProductComponent.prototype.addToCart = function () {
        this.productAddToCart.emit(this.product);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ProductComponent.prototype, "product", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ProductComponent.prototype, "productAddToCart", void 0);
    ProductComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product',
            template: __webpack_require__(/*! ./product.component.html */ "./src/app/Components/home/product/product.component.html"),
            styles: [__webpack_require__(/*! ./product.component.css */ "./src/app/Components/home/product/product.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ProductComponent);
    return ProductComponent;
}());



/***/ }),

/***/ "./src/app/Components/login/login.component.css":
/*!******************************************************!*\
  !*** ./src/app/Components/login/login.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".login{\r\n    background-image:  url(/assets/img/login.png);\r\n}\r\n.card{\r\n    height: 200px;\r\n}\r\n.row{\r\n    margin-top: 15px;\r\n}"

/***/ }),

/***/ "./src/app/Components/login/login.component.html":
/*!*******************************************************!*\
  !*** ./src/app/Components/login/login.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navigation></app-navigation>\r\n<div class=\"container \">\r\n    <div class=\"row\">\r\n        <div class=\"offset-2 col-6\">\r\n            <div class=\"card login shadow p-3 mb-5 bg-white rounded \">\r\n                    <div class=\"card-body\">\r\n                            <form [formGroup]=\"loginForm\" (ngSubmit)=\"login()\">\r\n                                <div *ngIf=\"error\">Content to render when condition is true.</div>\r\n                                <div class=\"form-group\">\r\n                                    <input class=\"form-control\" formControlName=\"email\" placeholder=\"xyz@gmail.com\" style=\"width:50%\">\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <input type=\"password\" class=\"form-control\" formControlName=\"password\" placeholder=\"Password\" style=\"width:50%\">\r\n                                </div>\r\n                                <input type=\"submit\" class=\"btn btn-secondary align-right\" value=\"Login\">\r\n                            </form>\r\n                    </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div>"

/***/ }),

/***/ "./src/app/Components/login/login.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/Components/login/login.component.ts ***!
  \*****************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Service/api.service */ "./src/app/Service/api.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = /** @class */ (function () {
    function LoginComponent(apiService, router, formBuilder) {
        this.apiService = apiService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.error = false;
        this.createForm();
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.createForm = function () {
        this.loginForm = this.formBuilder.group({
            email: '',
            password: ''
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.apiService.login(this.loginForm.value).
            subscribe(function (res) {
            if (res.status == "200" && res.userType == "CUSTOMER") {
                _this.apiService.storeToken(res.authToken, "customer");
                _this.router.navigate(['/home']);
                _this.error = false;
            }
            else if (res.status == "200" && res.userType == "ADMIN") {
                _this.apiService.storeToken(res.authToken, "admin");
                _this.router.navigate(['/admin']);
                _this.error = false;
            }
        }, function (err) {
            _this.router.navigate(['/login']);
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/Components/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/Components/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/Components/navigation/navigation.component.css":
/*!****************************************************************!*\
  !*** ./src/app/Components/navigation/navigation.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".navbar {\r\n  border-radius: 0;\r\n}\r\n.log {\r\n  text-align: right;\r\n}\r\n"

/***/ }),

/***/ "./src/app/Components/navigation/navigation.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/Components/navigation/navigation.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\">\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarTogglerDemo01\"\n      aria-controls=\"navbarTogglerDemo01\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n      <span class=\"navbar-toggler-icon\"></span>\n    </button>\n    <div class=\"collapse navbar-collapse\" id=\"navbarTogglerDemo01\" [ngSwitch]=\"loggedType\">\n      <div *ngSwitchCase=\"'home'\">\n        <ul class=\"navbar-nav mr-auto mt-2 mt-lg-0\">\n          <li class=\"nav-item\">\n            <a class=\" nav-link\" routerLink=\"/register\">Register</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\" nav-link\" routerLink=\"/login\">Login</a>\n          </li>\n        </ul>\n      </div>\n      <div class=\"ml-auto\" *ngSwitchCase=\"'customer'\">\n        <ul class=\"navbar-nav ml-auto mt-2 mt-lg-0\">\n          <li class=\"nav-item\">\n            <a class=\" nav-link\" routerLink=\"/home\">Home</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\" nav-link\" routerLink=\"/home/address\">Address</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\" nav-link\" routerLink=\"/home/cart\">Cart</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\" nav-link \" (click)=\"logout()\" style=\"cursor: pointer; float: right;\">Log out</a>\n          </li>\n        </ul>\n      </div>\n      <div class=\"ml-auto\" *ngSwitchCase=\"'admin'\">\n        <ul class=\"navbar-nav mt-2 mt-lg-0 \">\n          <li class=\"nav-item\">\n            <a class=\" nav-link\" routerLink=\"/admin\">Home</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\" nav-link\" routerLink=\"/admin/order\">Orders</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\" nav-link\" (click)=\"logout()\" style=\"cursor: pointer;\">Log out</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n</div>"

/***/ }),

/***/ "./src/app/Components/navigation/navigation.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/Components/navigation/navigation.component.ts ***!
  \***************************************************************/
/*! exports provided: NavigationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationComponent", function() { return NavigationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Service/api.service */ "./src/app/Service/api.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavigationComponent = /** @class */ (function () {
    function NavigationComponent(auth, route) {
        this.auth = auth;
        this.route = route;
        if (this.auth.getAuthType() == null) {
            this.loggedType = "home";
        }
        else {
            if (this.auth.getAuthType() == "customer") {
                this.loggedType = "customer";
            }
            else if (this.auth.getAuthType() == "admin") {
                this.loggedType = "admin";
            }
        }
    }
    NavigationComponent.prototype.ngOnInit = function () {
        //console.log(this.auth.getAuthType());
    };
    NavigationComponent.prototype.logout = function () {
        this.loggedType = "home";
        this.auth.removeToken();
        this.auth.logout();
        this.route.navigate(['/login']);
    };
    NavigationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navigation',
            template: __webpack_require__(/*! ./navigation.component.html */ "./src/app/Components/navigation/navigation.component.html"),
            styles: [__webpack_require__(/*! ./navigation.component.css */ "./src/app/Components/navigation/navigation.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], NavigationComponent);
    return NavigationComponent;
}());



/***/ }),

/***/ "./src/app/Components/register/register.component.css":
/*!************************************************************!*\
  !*** ./src/app/Components/register/register.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".invalid-input {\r\n  color: red;\r\n}\r\n.login{\r\n  background-image:  url(/assets/img/login.png);\r\n}\r\n.row{\r\n  margin-top: 15px;\r\n}"

/***/ }),

/***/ "./src/app/Components/register/register.component.html":
/*!*************************************************************!*\
  !*** ./src/app/Components/register/register.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navigation></app-navigation>\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"offset-2 col-6\">\n            <div class=\"card login shadow p-3 mb-5 bg-white rounded \">\n                <div class=\"card-body\">\n                    <form [formGroup]=\"registerForm\" (ngSubmit)=\"register()\">\n                        <div class=\"form-group\">\n                            <input class=\"form-control\" type=\"email\" formControlName=\"email\" placeholder=\"xyz@gmail.com\"\n                                style=\"width:50%\" required>\n                        </div>\n                        <div class=\"form-group\">\n                            <input class=\"form-control\" formControlName=\"username\" placeholder=\"Username\"\n                                style=\"width:50%\">\n                        </div>\n                        <div class=\"form-group\">\n                            <input class=\"form-control\" type=\"password\" formControlName=\"password\"\n                                placeholder=\"Password\" style=\"width:50%\">\n                        </div>\n                        <div class=\"form-group\">\n                            <input class=\"form-control\" type=\"number\" formControlName=\"age\" placeholder=\"Age\"\n                                style=\"width:50%\">\n                        </div>\n                        <input type=\"submit\" class=\"btn btn-secondary align-right\" value=\"Register\">\n                    </form>\n                </div>\n            </div>\n        </div>\n        <div>"

/***/ }),

/***/ "./src/app/Components/register/register.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/Components/register/register.component.ts ***!
  \***********************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Service/api.service */ "./src/app/Service/api.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(apiService, router, formBuilder) {
        this.apiService = apiService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.createForm();
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.createForm = function () {
        this.registerForm = this.formBuilder.group({
            email: '',
            password: '',
            username: '',
            age: '',
            usertype: 'customer'
        });
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.apiService.register(this.registerForm.value).
            subscribe(function (res) {
            if (res.status == "400") {
                console.log("Details cannot be empty");
            }
            else {
                _this.router.navigate(['/login']);
            }
        }, function (err) {
            alert("An error has occured, Please try again !!!");
        });
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/Components/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.css */ "./src/app/Components/register/register.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/Service/AuthInterceptor.ts":
/*!********************************************!*\
  !*** ./src/app/Service/AuthInterceptor.ts ***!
  \********************************************/
/*! exports provided: AuthInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthInterceptor", function() { return AuthInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Service/api.service */ "./src/app/Service/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(api) {
        this.api = api;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        if (this.api.getToken() != null) {
            var authReq = req.clone({
                headers: req.headers.set('Authorization', "Bearer " + this.api.getToken())
            });
            return next.handle(authReq);
        }
        else {
            return next.handle(req);
        }
    };
    AuthInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [src_app_Service_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])
    ], AuthInterceptor);
    return AuthInterceptor;
}());



/***/ }),

/***/ "./src/app/Service/api.service.ts":
/*!****************************************!*\
  !*** ./src/app/Service/api.service.ts ***!
  \****************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var angular_webstorage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-webstorage-service */ "./node_modules/angular-webstorage-service/bundles/angular-webstorage-service.es5.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ApiService = /** @class */ (function () {
    function ApiService(storage, http) {
        this.storage = storage;
        this.http = http;
    }
    // Registering new users to the system
    ApiService.prototype.register = function (user) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].signupUrl, JSON.stringify(user), {
            headers: { 'Content-Type': 'application/json' }
        });
    };
    // validating user credentials
    ApiService.prototype.login = function (user) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].loginUrl, JSON.stringify(user), {
            headers: { 'Content-Type': 'application/json' }
        });
    };
    ApiService.prototype.logout = function () {
        this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].logoutUrl);
    };
    // Add Products to the Cart
    ApiService.prototype.addToCart = function (product) {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].addToCartUrl + "?productId=" + product.productid);
    };
    // View Cart items
    ApiService.prototype.getCartItems = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].viewCartUrl);
    };
    // update items quantity in the cart
    ApiService.prototype.updateCartItem = function (prodid, quant) {
        var map = {
            "id": prodid,
            "quantity": quant
        };
        return this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].updateCartUrl, map);
    };
    // delete cart Item 
    ApiService.prototype.deleteCartItem = function (bufdid) {
        return this.http.delete(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].deleteCartUrl + "?bufcartid=" + bufdid);
    };
    // update Address 
    ApiService.prototype.addOrUpdateAddress = function (adr) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].addAddressUrl, adr);
    };
    // fetch address 
    ApiService.prototype.getAddress = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].viewAddressUrl);
    };
    // Fetching all the products
    ApiService.prototype.getProducts = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].productsUrl);
    };
    // Add product in the system
    ApiService.prototype.addProduct = function (desc, quan, price, prodname, image) {
        var formData = new FormData();
        formData.append("description", desc);
        formData.append("price", price);
        formData.append("productname", prodname);
        formData.append("quantity", quan);
        formData.append("file", image);
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].addProductUrl, formData);
    };
    // update Product for Logged Admin User
    ApiService.prototype.updateProduct = function (desc, quan, price, prodname, image, productid) {
        var formData = new FormData();
        formData.append("description", desc);
        formData.append("price", price);
        formData.append("productname", prodname);
        formData.append("quantity", quan);
        formData.append("file", image);
        formData.append("productId", productid);
        return this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].updateProductUrl, formData);
    };
    // delete Product
    ApiService.prototype.deleteProduct = function (prodid) {
        return this.http.delete(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].deleteProductUrl + "?productId=" + prodid);
    };
    // fetch available orders placed
    ApiService.prototype.getOrders = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].viewOrderUrl);
    };
    // place the order 
    ApiService.prototype.placeOrder = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].placeOrderUrl);
    };
    // update status for order
    ApiService.prototype.updateStatusForOrder = function (order) {
        var formData = new FormData();
        formData.append("orderId", order.orderId);
        formData.append("orderStatus", order.orderStatus);
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].updateOrderUrl, formData);
    };
    // Authentication Methods 
    ApiService.prototype.isAuthenticated = function () {
        return this.getToken() !== null;
    };
    ApiService.prototype.storeToken = function (token, auth_type) {
        this.storage.set("auth_token", token);
        this.storage.set("auth_type", auth_type);
    };
    ApiService.prototype.getAuthType = function () {
        if (this.storage.get("auth_type") !== null) {
            return this.storage.get("auth_type");
        }
        return null;
    };
    ApiService.prototype.getToken = function () {
        return this.storage.get("auth_token");
    };
    ApiService.prototype.removeToken = function () {
        this.storage.remove("auth_type");
        return this.storage.remove("auth_token");
    };
    ApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(angular_webstorage_service__WEBPACK_IMPORTED_MODULE_2__["SESSION_STORAGE"])),
        __metadata("design:paramtypes", [Object, _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "./src/app/Service/authguard.guard.ts":
/*!********************************************!*\
  !*** ./src/app/Service/authguard.guard.ts ***!
  \********************************************/
/*! exports provided: AuthguardGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthguardGuard", function() { return AuthguardGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.service */ "./src/app/Service/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthguardGuard = /** @class */ (function () {
    function AuthguardGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthguardGuard.prototype.canActivate = function () {
        if (!this.auth.isAuthenticated) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    };
    AuthguardGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthguardGuard);
    return AuthguardGuard;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".jumbotron {\r\n  margin-bottom: 0;\r\n  background-color: rgb(98, 189, 224);\r\n}\r\n\r\n.head-title {\r\n  margin-bottom: 30px;\r\n  color: white;\r\n  background-color: rgb(25, 122, 160);\r\n  font-family: \"Mansalva\", cursive;\r\n}\r\n"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div class=\"container head-title\">\n        <h4 class=\"display-4 text-center\">E-Commerce</h4>\n        \n</div>\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Service_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Service/api.service */ "./src/app/Service/api.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AppComponent.prototype.ngOnInit = function () {
        if (this.auth.isAuthenticated() != null && this.auth.getAuthType() == "customer") {
            this.router.navigate(["/home"]);
        }
        else if (this.auth.isAuthenticated() != null && this.auth.getAuthType() == "admin") {
            this.router.navigate(["/admin"]);
        }
        else {
            this.router.navigate(["/login"]);
        }
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_Service_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var angular_webstorage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-webstorage-service */ "./node_modules/angular-webstorage-service/bundles/angular-webstorage-service.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _Components_navigation_navigation_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Components/navigation/navigation.component */ "./src/app/Components/navigation/navigation.component.ts");
/* harmony import */ var _Components_login_login_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Components/login/login.component */ "./src/app/Components/login/login.component.ts");
/* harmony import */ var _Components_register_register_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Components/register/register.component */ "./src/app/Components/register/register.component.ts");
/* harmony import */ var _Components_home_home_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Components/home/home.component */ "./src/app/Components/home/home.component.ts");
/* harmony import */ var _Service_authguard_guard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Service/authguard.guard */ "./src/app/Service/authguard.guard.ts");
/* harmony import */ var _Components_admin_admin_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Components/admin/admin.component */ "./src/app/Components/admin/admin.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _Components_home_product_product_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Components/home/product/product.component */ "./src/app/Components/home/product/product.component.ts");
/* harmony import */ var _Components_home_cart_item_cart_item_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Components/home/cart-item/cart-item.component */ "./src/app/Components/home/cart-item/cart-item.component.ts");
/* harmony import */ var _Components_home_address_address_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Components/home/address/address.component */ "./src/app/Components/home/address/address.component.ts");
/* harmony import */ var _Components_admin_edit_item_edit_item_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Components/admin/edit-item/edit-item.component */ "./src/app/Components/admin/edit-item/edit-item.component.ts");
/* harmony import */ var _Components_admin_order_item_order_item_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Components/admin/order-item/order-item.component */ "./src/app/Components/admin/order-item/order-item.component.ts");
/* harmony import */ var _Service_AuthInterceptor__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Service/AuthInterceptor */ "./src/app/Service/AuthInterceptor.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var appRoutes = [
    { path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: _Components_login_login_component__WEBPACK_IMPORTED_MODULE_9__["LoginComponent"]
    },
    {
        path: 'register',
        component: _Components_register_register_component__WEBPACK_IMPORTED_MODULE_10__["RegisterComponent"]
    },
    {
        path: 'admin',
        component: _Components_admin_admin_component__WEBPACK_IMPORTED_MODULE_13__["AdminComponent"]
    },
    {
        path: 'home',
        component: _Components_home_home_component__WEBPACK_IMPORTED_MODULE_11__["HomeComponent"],
        canActivate: [_Service_authguard_guard__WEBPACK_IMPORTED_MODULE_12__["AuthguardGuard"]]
    },
    {
        path: 'home/cart',
        component: _Components_home_cart_item_cart_item_component__WEBPACK_IMPORTED_MODULE_16__["CartItemComponent"],
        canActivate: [_Service_authguard_guard__WEBPACK_IMPORTED_MODULE_12__["AuthguardGuard"]]
    },
    {
        path: 'home/address',
        component: _Components_home_address_address_component__WEBPACK_IMPORTED_MODULE_17__["AddressComponent"],
        canActivate: [_Service_authguard_guard__WEBPACK_IMPORTED_MODULE_12__["AuthguardGuard"]]
    },
    {
        path: 'admin/edit',
        component: _Components_admin_edit_item_edit_item_component__WEBPACK_IMPORTED_MODULE_18__["EditItemComponent"],
        canActivate: [_Service_authguard_guard__WEBPACK_IMPORTED_MODULE_12__["AuthguardGuard"]]
    },
    {
        path: 'admin/order',
        component: _Components_admin_order_item_order_item_component__WEBPACK_IMPORTED_MODULE_19__["OrderItemComponent"],
        canActivate: [_Service_authguard_guard__WEBPACK_IMPORTED_MODULE_12__["AuthguardGuard"]]
    }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _Components_navigation_navigation_component__WEBPACK_IMPORTED_MODULE_8__["NavigationComponent"],
                _Components_login_login_component__WEBPACK_IMPORTED_MODULE_9__["LoginComponent"],
                _Components_register_register_component__WEBPACK_IMPORTED_MODULE_10__["RegisterComponent"],
                _Components_home_product_product_component__WEBPACK_IMPORTED_MODULE_15__["ProductComponent"],
                _Components_home_home_component__WEBPACK_IMPORTED_MODULE_11__["HomeComponent"],
                _Components_home_cart_item_cart_item_component__WEBPACK_IMPORTED_MODULE_16__["CartItemComponent"],
                _Components_home_address_address_component__WEBPACK_IMPORTED_MODULE_17__["AddressComponent"],
                _Components_admin_admin_component__WEBPACK_IMPORTED_MODULE_13__["AdminComponent"],
                _Components_admin_edit_item_edit_item_component__WEBPACK_IMPORTED_MODULE_18__["EditItemComponent"],
                _Components_admin_order_item_order_item_component__WEBPACK_IMPORTED_MODULE_19__["OrderItemComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
                angular_webstorage_service__WEBPACK_IMPORTED_MODULE_4__["StorageServiceModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forRoot(appRoutes),
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__["NgbModule"].forRoot(),
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__["NgbModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"]
            ],
            providers: [{
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HTTP_INTERCEPTORS"],
                    useClass: _Service_AuthInterceptor__WEBPACK_IMPORTED_MODULE_20__["AuthInterceptor"],
                    multi: true,
                },],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    baseUrl: "http://localhost:8087",
    signupUrl: "/home/signup",
    loginUrl: "/home/auth",
    addToCartUrl: "/user/addToCart",
    viewCartUrl: "/user/viewCart",
    updateCartUrl: "/user/updateCart",
    deleteCartUrl: "/user/delCart",
    addAddressUrl: "/user/addAddress",
    viewAddressUrl: "/user/getAddress",
    productsUrl: "/user/getProducts",
    addProductUrl: "/admin/addProduct",
    deleteProductUrl: "/admin/delProduct",
    updateProductUrl: "/admin/updateProducts",
    viewOrderUrl: "/admin/viewOrders",
    updateOrderUrl: "/admin/updateOrder",
    placeOrderUrl: "/user/placeOrder",
    logoutUrl: "/home/logout",
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error',  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\nus-iss-grp\code\nus-iss-grp-project-1\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map