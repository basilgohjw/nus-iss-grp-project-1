package com.spring.controller;

import static org.junit.Assert.assertEquals;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.easymarket.demo.CartApplication;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;

import com.spring.dto.UserDTO;

@WebMvcTest({AdminOrderController.class, UserOrderController.class})
@ContextConfiguration(classes = CartApplication.class)
class OrderControllerTest {

	@Autowired
	MockMvc mockMvc;

	@Autowired
	WebApplicationContext context;

	public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
	}

	@Test
	void viewOrders() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/admin/viewOrders").accept(MediaType.APPLICATION_JSON)
				.header("Access-Control-Request-Method", "GET")
			    .header("Origin", "http://localhost:4200"))
		.andExpect(status().isOk());
	}
	
	@Test
	void updateOrder() throws Exception {
		MvcResult res = mockMvc.perform(post("/admin/updateOrder?orderId=1&orderStatus=Paid").contentType(MediaType.APPLICATION_JSON)
				.header("Access-Control-Request-Method", "POST")
			    .header("Origin", "http://localhost:4200"))
		.andExpect(status().isOk()).andReturn();

		assertEquals(200, res.getResponse().getStatus());
	}
	
	@Test
	void placeOrder() throws Exception {
		UserDTO userDTO = new UserDTO();
		userDTO.setName("user");
		userDTO.setEmail("user@gmail.com");
		
		MvcResult res = mockMvc.perform(post("/user/placeOrder").contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(userDTO))
				.header("Access-Control-Request-Method", "POST")
			    .header("Origin", "http://localhost:4200"))
		.andExpect(status().isOk()).andReturn();

		assertEquals(200, res.getResponse().getStatus());
	}
}
