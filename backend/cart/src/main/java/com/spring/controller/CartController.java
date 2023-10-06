package com.spring.controller;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import com.spring.dto.CartDTO;
import com.spring.dto.CartRequestDTO;
import com.spring.dto.ProductDTO;
import com.spring.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.spring.constants.ResponseCode;
import com.spring.constants.WebConstants;
import com.spring.exception.CartCustomException;
import com.spring.model.Bufcart;
import com.spring.repository.CartRepository;
import com.spring.response.CartResponse;
import com.spring.response.ServerResponse;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = WebConstants.ALLOWED_URL)
@RestController
@RequestMapping("/user")
public class CartController {

    private static Logger logger = Logger.getLogger(CartController.class.getName());

//    private static final String GET_USER_INFO = "http://localhost:8080/user/getUserInfo/";
//    private static final String GET_PRODUCT_INFO = "http://localhost:8080/user/getProductInfo/";

//    private RestTemplate restTemplate;
    @Autowired
    private CartRepository cartRepo;

    @PostMapping("/addToCart")
    public ResponseEntity<ServerResponse> addToCart(@RequestBody CartRequestDTO cartRequestDTO)
            throws IOException {

        ServerResponse resp = new ServerResponse();
        try {
//            ResponseEntity<UserResponse> userResponseEntity = restTemplate
//                    .getForEntity(GET_USER_INFO + auth.getName(),
//                            UserResponse.class);
//
//            ResponseEntity<ProductResponse> productResponseEntity = restTemplate
//                    .getForEntity(GET_PRODUCT_INFO + productId,
//                            ProductResponse.class);
//
//            User loggedUser = Objects.requireNonNull(userResponseEntity.getBody()).getUser();
//            Product cartItem = Objects.requireNonNull(productResponseEntity.getBody()).getProduct();

            UserDTO userDTO = cartRequestDTO.getUserDTO();
            ProductDTO productDTO = cartRequestDTO.getProductDTO();

            Bufcart buf = new Bufcart();
            buf.setEmail(userDTO.getEmail());
            buf.setQuantity(1);
            buf.setPrice(productDTO.getProductPrice());
            buf.setProductId(Integer.parseInt(productDTO.getProductId()));
            buf.setProductname(productDTO.getProductName());
            Date date = new Date();
            buf.setDateAdded(date);

            cartRepo.save(buf);

            resp.setStatus(ResponseCode.SUCCESS_CODE);
            resp.setMessage(ResponseCode.CART_UPD_MESSAGE_CODE);
        } catch (Exception e) {
            throw new CartCustomException("Unable to add product to cart, please try again");
        }
        return new ResponseEntity<ServerResponse>(resp, HttpStatus.OK);
    }

    @PostMapping("/viewCart")
    public ResponseEntity<CartResponse> viewCart(@RequestBody UserDTO userDTO)
            throws IOException {
        CartResponse resp = new CartResponse();
        try {
//            ResponseEntity<UserResponse> userResponseEntity = restTemplate
//                    .getForEntity(GET_USER_INFO + auth.getName(),
//                            UserResponse.class);
//            User loggedUser = Objects.requireNonNull(userResponseEntity.getBody()).getUser();

            resp.setStatus(ResponseCode.SUCCESS_CODE);
            resp.setMessage(ResponseCode.VW_CART_MESSAGE);
            resp.setOblist(cartRepo.findByEmail(userDTO.getEmail()));
        } catch (Exception e) {
            throw new CartCustomException("Unable to retrieve cart items, please try again");
        }

        return new ResponseEntity<CartResponse>(resp, HttpStatus.OK);
    }

    @PutMapping("/updateCart")
    public ResponseEntity<CartResponse> updateCart(@RequestBody CartRequestDTO cartRequestDTO)
            throws IOException {

        CartResponse resp = new CartResponse();
        try {
//            ResponseEntity<UserResponse> userResponseEntity = restTemplate
//                    .getForEntity(GET_USER_INFO + auth.getName(),
//                            UserResponse.class);
//            User loggedUser = Objects.requireNonNull(userResponseEntity.getBody()).getUser();

            UserDTO userDTO = cartRequestDTO.getUserDTO();
            CartDTO cartDTO = cartRequestDTO.getCartDTO();

            Bufcart selCart = cartRepo.findByBufcartIdAndEmail(Integer.parseInt(cartDTO.getCartId()), userDTO.getEmail());
            selCart.setQuantity(Integer.parseInt(cartDTO.getCartQuantity()));
            cartRepo.save(selCart);
            List<Bufcart> bufcartlist = cartRepo.findByEmail(userDTO.getEmail());
            resp.setStatus(ResponseCode.SUCCESS_CODE);
            resp.setMessage(ResponseCode.UPD_CART_MESSAGE);
            resp.setOblist(bufcartlist);
        } catch (Exception e) {
            throw new CartCustomException("Unable to update cart items, please try again");
        }

        return new ResponseEntity<CartResponse>(resp, HttpStatus.OK);
    }

    @PostMapping("/delCart")
    public ResponseEntity<CartResponse> delCart(@RequestBody CartRequestDTO cartRequestDTO) throws IOException {

        CartResponse resp = new CartResponse();
        try {
//            ResponseEntity<UserResponse> userResponseEntity = restTemplate
//                    .getForEntity(GET_USER_INFO + auth.getName(),
//                            UserResponse.class);
//            User loggedUser = Objects.requireNonNull(userResponseEntity.getBody()).getUser();

            UserDTO userDTO = cartRequestDTO.getUserDTO();
            CartDTO cartDTO = cartRequestDTO.getCartDTO();

            cartRepo.deleteByBufcartIdAndEmail(Integer.parseInt(cartDTO.getCartId()), userDTO.getEmail());
            List<Bufcart> bufcartlist = cartRepo.findByEmail(userDTO.getEmail());
            resp.setStatus(ResponseCode.SUCCESS_CODE);
            resp.setMessage(ResponseCode.DEL_CART_SUCCESS_MESSAGE);
            resp.setOblist(bufcartlist);
        } catch (Exception e) {
            throw new CartCustomException("Unable to delete cart items, please try again");
        }
        return new ResponseEntity<CartResponse>(resp, HttpStatus.OK);
    }
}
