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
import com.spring.response.ServerResponse;

@CrossOrigin(origins = WebConstants.ALLOWED_URL)
@RestController
@RequestMapping("/user")
public class UserOrderController {

    private static Logger logger = Logger.getLogger(UserOrderController.class.getName());

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private OrderRepository ordRepo;
    
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
            List<Bufcart> buflist = cartRepo.findAllByEmail(userDTO.getEmail());
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
        } catch (Exception e) {
            throw new PlaceOrderCustomException("Unable to place order, please try again later");
        }
        return new ResponseEntity<ServerResponse>(resp, HttpStatus.OK);
    }
}
