package com.spring.controller;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import com.spring.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.spring.constants.ResponseCode;
import com.spring.constants.WebConstants;
import com.spring.exception.PlaceOrderCustomException;
import com.spring.model.Bufcart;
import com.spring.model.PlaceOrder;
import com.spring.repository.CartRepository;
import com.spring.repository.OrderRepository;
import com.spring.repository.PaymentRepository;
import com.spring.response.ServerResponse;
import org.springframework.web.multipart.MultipartFile;
import com.spring.util.Validator;
import com.spring.model.Payment;

@CrossOrigin(origins = { WebConstants.ALLOWED_URL, WebConstants.ALLOWED_URL_PROD })
@RestController
@RequestMapping("/user")
public class UserOrderController {

    private static Logger logger = Logger.getLogger(UserOrderController.class.getName());

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private OrderRepository ordRepo;
    
    @Autowired
    private PaymentRepository payRepo;
    
    @PostMapping("/placeOrder")
    public ResponseEntity<ServerResponse> placeOrder(@RequestBody UserDTO userDTO) throws IOException {

        ServerResponse resp = new ServerResponse();
        try {
//            User loggedUser = userRepo.findByUsername(auth.getName())
//                    .orElseThrow(() -> new UserCustomException(auth.getName()));
            PlaceOrder po = new PlaceOrder();
            po.setEmail(userDTO.getEmail());
            Date date = new Date();
            po.setOrderDate(date);
            po.setOrderStatus(ResponseCode.ORD_STATUS_CODE);
            double total = 0;
            List<Bufcart> buflist = cartRepo.findByEmailAndOrderId(userDTO.getEmail(), 0);
            for (Bufcart buf : buflist) {
                total += buf.getQuantity() * buf.getPrice();
            }
            po.setTotalCost(total);
            PlaceOrder res = ordRepo.save(po);
            buflist.forEach(bufcart -> {
                bufcart.setOrderId(res.getOrderId());
                cartRepo.save(bufcart);

            });
            resp.setStatus(ResponseCode.SUCCESS_CODE);
            resp.setMessage(ResponseCode.ORD_SUCCESS_MESSAGE);
            resp.setOblist(buflist);
        } catch (Exception e) {
            throw new PlaceOrderCustomException("Unable to place order, please try again later");
        }
        return new ResponseEntity<ServerResponse>(resp, HttpStatus.OK);
    }
    
    @PostMapping("/processOrder")
    public ResponseEntity<ServerResponse> processOrder(
    		@RequestParam(name = WebConstants.PROD_FILE, required = false) MultipartFile prodImage,
            @RequestParam(name = "paymentType") String paymentType,
            @RequestParam(name = "amount") String amount,
            @RequestParam(name = "phone") String phone,
            @RequestParam(name = "orderId") String orderId
    		) throws IOException {

    	ServerResponse resp = new ServerResponse();
		if (Validator.isStringEmpty(paymentType) || Validator.isStringEmpty(amount)) {
			resp.setStatus(ResponseCode.BAD_REQUEST_CODE);
			resp.setMessage(ResponseCode.BAD_REQUEST_MESSAGE);
			return new ResponseEntity<ServerResponse>(resp, HttpStatus.NOT_ACCEPTABLE);
		} else {
			try {
                Payment payment = new Payment();
                payment.setPhonenumber(phone);
                payment.setAmount(Double.parseDouble(amount));
                payment.setPaymentType(paymentType);
                payment.setOrderid(Integer.parseInt(orderId));
                if (prodImage != null) {
                	payment.setPaymentimage(prodImage.getBytes());
                }System.out.print("-----------> Before Save Payment");
                payRepo.save(payment);
                System.out.print("-----------> Before After Payment");
                resp.setStatus(ResponseCode.SUCCESS_CODE);
                resp.setMessage(ResponseCode.ADD_SUCCESS_MESSAGE);
//                resp.setOblist(payRepo.findAll());
            } catch (Exception e) {
                throw new PlaceOrderCustomException("Unable to process payment details, please try again");
            }
		}
		return new ResponseEntity<ServerResponse>(resp, HttpStatus.OK);
    }
}
