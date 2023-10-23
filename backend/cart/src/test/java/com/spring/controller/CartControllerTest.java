package com.spring.controller;

import static org.junit.Assert.assertEquals;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.easymarket.demo.CartApplication;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;

import com.spring.dto.CartDTO;
import com.spring.dto.CartRequestDTO;
import com.spring.dto.ProductDTO;
import com.spring.dto.UserDTO;

@WebMvcTest(CartController.class)
@ContextConfiguration(classes = CartApplication.class)
class CartControllerTest {

	@Autowired
	MockMvc mockMvc;

	@Autowired
	WebApplicationContext context;

	public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
	}
	
	
	@Test
	void addToCart() throws Exception {
		UserDTO userDTO = new UserDTO();
		userDTO.setName("user");
		userDTO.setEmail("user@gmail.com");
		ProductDTO productDTO = new ProductDTO();
		productDTO.setProductId(4);
		productDTO.setProductName("Table 2");
		productDTO.setProductPrice(10000);
		productDTO.setProductQuantity(10);
		CartDTO cartDTO = new CartDTO();
		cartDTO.setCartId(1);
		cartDTO.setCartQuantity(1);
		CartRequestDTO cartRequestDTO = new CartRequestDTO();
		cartRequestDTO.setUserDTO(userDTO);
		cartRequestDTO.setProductDTO(productDTO);
		cartRequestDTO.setCartDTO(cartDTO);
		
		MvcResult res = mockMvc.perform(post("/user/addToCart").contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(cartRequestDTO))
				.header("Access-Control-Request-Method", "POST")
			    .header("Origin", "http://localhost:4200"))
		.andExpect(status().isOk()).andReturn();

		assertEquals(200, res.getResponse().getStatus());
	}
	
	@Test
	void viewCart() throws Exception {
		UserDTO userDTO = new UserDTO();
		userDTO.setName("user");
		userDTO.setEmail("user@gmail.com");
		
		MvcResult res = mockMvc.perform(post("/user/viewCart").contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(userDTO))
				.header("Access-Control-Request-Method", "POST")
			    .header("Origin", "http://localhost:4200"))
		.andExpect(status().isOk()).andReturn();

		assertEquals(200, res.getResponse().getStatus());
	}
	
	@Test
	void updateCart() throws Exception {
		UserDTO userDTO = new UserDTO();
		userDTO.setName("user");
		userDTO.setEmail("user@gmail.com");
		ProductDTO productDTO = new ProductDTO();
		productDTO.setProductId(4);
		productDTO.setProductName("Table 2");
		productDTO.setProductPrice(10000);
		productDTO.setProductQuantity(20);
		CartDTO cartDTO = new CartDTO();
		cartDTO.setCartId(2);
		cartDTO.setCartQuantity(3);
		CartRequestDTO cartRequestDTO = new CartRequestDTO();
		cartRequestDTO.setUserDTO(userDTO);
		cartRequestDTO.setProductDTO(productDTO);
		cartRequestDTO.setCartDTO(cartDTO);
		
		MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.put("/user/updateCart").contentType(MediaType.APPLICATION_JSON);
		MvcResult res = mockMvc.perform(builder
				.content(new ObjectMapper().writeValueAsString(cartRequestDTO))
				.header("Access-Control-Request-Method", "PUT")
			    .header("Origin", "http://localhost:4200"))
		.andExpect(status().isOk()).andReturn();

		assertEquals(200, res.getResponse().getStatus());
	}
	
	@Test
	void deleteCartItem() throws Exception {
		//to update CartId before running Test Case
		UserDTO userDTO = new UserDTO();
		userDTO.setName("user");
		userDTO.setEmail("user@gmail.com");
		ProductDTO productDTO = new ProductDTO();
		productDTO.setProductId(4);
		productDTO.setProductName("Table 2");
		productDTO.setProductPrice(10000);
		productDTO.setProductQuantity(10);
		CartDTO cartDTO = new CartDTO();
		cartDTO.setCartId(9);
		cartDTO.setCartQuantity(1);
		CartRequestDTO cartRequestDTO = new CartRequestDTO();
		cartRequestDTO.setUserDTO(userDTO);
		cartRequestDTO.setProductDTO(productDTO);
		cartRequestDTO.setCartDTO(cartDTO);
		
		MvcResult res = mockMvc.perform(post("/user/delCart").contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(cartRequestDTO))
				.header("Access-Control-Request-Method", "POST")
			    .header("Origin", "http://localhost:4200"))
		.andExpect(status().isOk()).andReturn();

		assertEquals(200, res.getResponse().getStatus());
	}

}
