package com.spring.controller;

import static org.junit.Assert.assertEquals;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;
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

import com.easymarket.demo.ProductApplication;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;

@WebMvcTest({AdminProductController.class, UserProductController.class})
@ContextConfiguration(classes = ProductApplication.class)
class ProductControllerTest {

	@Autowired
	MockMvc mockMvc;

	@Autowired
	WebApplicationContext context;

	public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
	}
	
	@Test
	void getProducts() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/user/getProducts").accept(MediaType.APPLICATION_JSON)
				.header("Access-Control-Request-Method", "GET")
			    .header("Origin", "http://localhost:4200"))
		.andExpect(status().isOk());	
	}
	
	@Test
	void getProductInfo() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/user/getProductInfo?productId=1").accept(MediaType.APPLICATION_JSON)
				.header("Access-Control-Request-Method", "GET")
			    .header("Origin", "http://localhost:4200"))
		.andExpect(status().isOk());	
	}
	
	@Test
	void addProduct() throws Exception {
		MvcResult res = mockMvc.perform(post("/admin/addProduct?file=null&description=This is a test description&price=1234&productname=test product name&quantity=100").contentType(MediaType.APPLICATION_JSON)
				.header("Access-Control-Request-Method", "POST")
			    .header("Origin", "http://localhost:4200"))
		.andExpect(status().isOk()).andReturn();

		assertEquals(200, res.getResponse().getStatus());
	}
	
	@Test
	void updateProduct() throws Exception {
		MvcResult res = mockMvc.perform(post("/admin/addProduct?file=null&description=This is a test description&price=1234&productname=test product name&quantity=100&productId=3").contentType(MediaType.APPLICATION_JSON)
				.header("Access-Control-Request-Method", "POST")
			    .header("Origin", "http://localhost:4200"))
		.andExpect(status().isOk()).andReturn();

		assertEquals(200, res.getResponse().getStatus());
	}
	
	@Test
	void deleteProduct() throws Exception {
		//to update the productId to be deleted everytime before running
		mockMvc.perform(MockMvcRequestBuilders.get("/user/delProduct?productId=3").accept(MediaType.APPLICATION_JSON)
				.header("Access-Control-Request-Method", "DELETE")
			    .header("Origin", "http://localhost:4200"))
		.andExpect(status().isOk());
	}

}
