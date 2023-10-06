package com.spring.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.constants.ResponseCode;
import com.spring.constants.WebConstants;
import com.spring.exception.OrderCustomException;
import com.spring.model.PlaceOrder;
import com.spring.repository.CartRepository;
import com.spring.repository.OrderRepository;
import com.spring.response.Order;
import com.spring.response.ServerResponse;
import com.spring.response.ViewOrderResponse;
import com.spring.util.Validator;

@CrossOrigin(origins = WebConstants.ALLOWED_URL)
@RestController
@RequestMapping("/admin")
public class AdminOrderController {

    @Autowired
    private OrderRepository ordRepo;

    @Autowired
    private CartRepository cartRepo;

    @GetMapping("/viewOrders")
    public ResponseEntity<ViewOrderResponse> viewOrders() throws IOException {

        ViewOrderResponse resp = new ViewOrderResponse();
        try {
            resp.setStatus(ResponseCode.SUCCESS_CODE);
            resp.setMessage(ResponseCode.VIEW_SUCCESS_MESSAGE);
            List<Order> orderList = new ArrayList<>();
            List<PlaceOrder> poList = ordRepo.findAll();
            poList.forEach((po) -> {
                Order ord = new Order();
                ord.setOrderBy(po.getEmail());
                ord.setOrderId(po.getOrderId());
                ord.setOrderStatus(po.getOrderStatus());
                ord.setProducts(cartRepo.findAllByOrderId(po.getOrderId()));
                orderList.add(ord);
            });
            resp.setOrderlist(orderList);
        } catch (Exception e) {
            throw new OrderCustomException("Unable to retrieve orders, please try again");
        }

        return new ResponseEntity<ViewOrderResponse>(resp, HttpStatus.OK);
    }

    @PostMapping("/updateOrder")
    public ResponseEntity<ServerResponse> updateOrders(@RequestParam(name = WebConstants.ORD_ID) String orderId,
                                                       @RequestParam(name = WebConstants.ORD_STATUS) String orderStatus) throws IOException {

        ServerResponse resp = new ServerResponse();
        if (Validator.isStringEmpty(orderId) || Validator.isStringEmpty(orderStatus)) {
            resp.setStatus(ResponseCode.BAD_REQUEST_CODE);
            resp.setMessage(ResponseCode.BAD_REQUEST_MESSAGE);
            return new ResponseEntity<ServerResponse>(resp, HttpStatus.NOT_ACCEPTABLE);
        } else {
            try {
                PlaceOrder pc = ordRepo.findByOrderId(Integer.parseInt(orderId));
                pc.setOrderStatus(orderStatus);
                pc.setOrderDate(new Date(System.currentTimeMillis()));
                ordRepo.save(pc);
                resp.setStatus(ResponseCode.SUCCESS_CODE);
                resp.setMessage(ResponseCode.UPD_ORD_SUCCESS_MESSAGE);
            } catch (Exception e) {
                throw new OrderCustomException("Unable to retrieve orders, please try again");
            }
        }
        return new ResponseEntity<ServerResponse>(resp, HttpStatus.OK);
    }
}
