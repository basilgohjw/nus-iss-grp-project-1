package com.spring.controller;

import java.io.IOException;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.constants.ResponseCode;
import com.spring.constants.WebConstants;
import com.spring.exception.ProductCustomException;
import com.spring.model.Product;
import com.spring.repository.ProductRepository;
import com.spring.response.ProductResponse;

@CrossOrigin(origins = WebConstants.ALLOWED_URL)
@RestController
@RequestMapping("/user")
public class UserProductController {

    private static Logger logger = Logger.getLogger(UserProductController.class.getName());

    @Autowired
    private ProductRepository prodRepo;

    @GetMapping("/getProducts")
    public ResponseEntity<ProductResponse> getProducts() throws IOException {
        ProductResponse resp = new ProductResponse();
        try {
            resp.setStatus(ResponseCode.SUCCESS_CODE);
            resp.setMessage(ResponseCode.LIST_SUCCESS_MESSAGE);
            resp.setOblist(prodRepo.findAll());
        } catch (Exception e) {
            throw new ProductCustomException("Unable to retrieve products, please try again");
        }
        return new ResponseEntity<ProductResponse>(resp, HttpStatus.OK);
    }

    @GetMapping("/getProductInfo")
    public ResponseEntity<ProductResponse> getProductInfo(String productId) {
        ProductResponse resp = new ProductResponse();
        try {
            Product product = prodRepo.findByProductid(Integer.parseInt(productId));

            resp.setProduct(product);
            resp.setStatus(ResponseCode.SUCCESS_CODE);
            resp.setMessage(ResponseCode.SUCCESS_MESSAGE);
        } catch (Exception e) {
            throw new ProductCustomException("Unable to retrieve products, please try again");
        }
        return new ResponseEntity<ProductResponse>(resp, HttpStatus.OK);
    }

    @GetMapping("/getTestData")
	public ResponseEntity<ProductResponse> getTestData(Authentication auth) {
		ProductResponse resp = new ProductResponse();
		resp.setMessage("This is a test message for product");
		return new ResponseEntity<ProductResponse>(resp, HttpStatus.OK);
	}
}
