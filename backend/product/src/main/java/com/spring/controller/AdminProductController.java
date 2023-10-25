package com.spring.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.constants.ResponseCode;
import com.spring.constants.WebConstants;
import com.spring.exception.ProductCustomException;
import com.spring.model.Product;
import com.spring.repository.ProductRepository;
import com.spring.response.ProductResponse;
import com.spring.response.ServerResponse;
import com.spring.util.Validator;

@CrossOrigin(origins = { WebConstants.ALLOWED_URL, WebConstants.ALLOWED_URL_PROD })
@RestController
@RequestMapping("/admin")
public class AdminProductController {

    @Autowired
    private ProductRepository prodRepo;

    @PostMapping("/addProduct")
    public ResponseEntity<ProductResponse> addProduct(
            @RequestParam(name = WebConstants.PROD_FILE, required = false) MultipartFile prodImage,
            @RequestParam(name = WebConstants.PROD_DESC) String description,
            @RequestParam(name = WebConstants.PROD_PRICE) String price,
            @RequestParam(name = WebConstants.PROD_NAME) String productname,
            @RequestParam(name = WebConstants.PROD_QUANITY) String quantity) throws IOException {
        ProductResponse resp = new ProductResponse();
        if (Validator.isStringEmpty(productname) || Validator.isStringEmpty(description)
                || Validator.isStringEmpty(price) || Validator.isStringEmpty(quantity)) {
            resp.setStatus(ResponseCode.BAD_REQUEST_CODE);
            resp.setMessage(ResponseCode.BAD_REQUEST_MESSAGE);
            return new ResponseEntity<ProductResponse>(resp, HttpStatus.NOT_ACCEPTABLE);
        } else {
            try {
                Product prod = new Product();
                prod.setDescription(description);
                prod.setPrice(Double.parseDouble(price));
                prod.setProductname(productname);
                prod.setQuantity(Integer.parseInt(quantity));
                if (prodImage != null) {
                    prod.setProductimage(prodImage.getBytes());
                }
                prodRepo.save(prod);
                resp.setStatus(ResponseCode.SUCCESS_CODE);
                resp.setMessage(ResponseCode.ADD_SUCCESS_MESSAGE);
                resp.setOblist(prodRepo.findAll());
            } catch (Exception e) {
                throw new ProductCustomException("Unable to save product details, please try again");
            }
        }
        return new ResponseEntity<ProductResponse>(resp, HttpStatus.OK);
    }

    @PutMapping("/updateProducts")
    public ResponseEntity<ServerResponse> updateProducts(
            @RequestParam(name = WebConstants.PROD_FILE, required = false) MultipartFile prodImage,
            @RequestParam(name = WebConstants.PROD_DESC) String description,
            @RequestParam(name = WebConstants.PROD_PRICE) String price,
            @RequestParam(name = WebConstants.PROD_NAME) String productname,
            @RequestParam(name = WebConstants.PROD_QUANITY) String quantity,
            @RequestParam(name = WebConstants.PROD_ID) String productid) throws IOException {
        ServerResponse resp = new ServerResponse();
        if (Validator.isStringEmpty(productname) || Validator.isStringEmpty(description)
                || Validator.isStringEmpty(price) || Validator.isStringEmpty(quantity)) {
            resp.setStatus(ResponseCode.BAD_REQUEST_CODE);
            resp.setMessage(ResponseCode.BAD_REQUEST_MESSAGE);
            return new ResponseEntity<ServerResponse>(resp, HttpStatus.NOT_ACCEPTABLE);
        } else {
            try {
                if (prodImage != null) {
                    Product prod = new Product(Integer.parseInt(productid), description, productname,
                            Double.parseDouble(price), Integer.parseInt(quantity), prodImage.getBytes());
                    prodRepo.save(prod);
                } else {
                    Product prodOrg = prodRepo.findByProductid(Integer.parseInt(productid));
                    Product prod = new Product(Integer.parseInt(productid), description, productname,
                            Double.parseDouble(price), Integer.parseInt(quantity), prodOrg.getProductimage());
                    prodRepo.save(prod);
                }
                resp.setStatus(ResponseCode.SUCCESS_CODE);
                resp.setMessage(ResponseCode.UPD_SUCCESS_MESSAGE);
            } catch (Exception e) {
                throw new ProductCustomException("Unable to update product details, please try again");
            }
        }
        return new ResponseEntity<ServerResponse>(resp, HttpStatus.OK);
    }

    @DeleteMapping("/delProduct")
    public ResponseEntity<ProductResponse> delProduct(@RequestParam(name = WebConstants.PROD_ID) String productid)
            throws IOException {
        ProductResponse resp = new ProductResponse();
        if (Validator.isStringEmpty(productid)) {
            resp.setStatus(ResponseCode.BAD_REQUEST_CODE);
            resp.setMessage(ResponseCode.BAD_REQUEST_MESSAGE);
            return new ResponseEntity<ProductResponse>(resp, HttpStatus.NOT_ACCEPTABLE);
        } else {
            try {
                prodRepo.deleteByProductid(Integer.parseInt(productid));
                resp.setStatus(ResponseCode.SUCCESS_CODE);
                resp.setMessage(ResponseCode.DEL_SUCCESS_MESSAGE);
            } catch (Exception e) {
                throw new ProductCustomException("Unable to delete product details, please try again");
            }
        }
        return new ResponseEntity<ProductResponse>(resp, HttpStatus.OK);
    }
}
