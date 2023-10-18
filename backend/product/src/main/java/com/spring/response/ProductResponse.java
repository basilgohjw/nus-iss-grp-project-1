package com.spring.response;

import java.util.List;

import com.spring.model.Product;

public class ProductResponse {
	private String status;
	private String message;
	private String AUTH_TOKEN;
	private List<Product> oblist;

	private Product product;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getAUTH_TOKEN() {
		return AUTH_TOKEN;
	}

	public void setAUTH_TOKEN(String aUTH_TOKEN) {
		AUTH_TOKEN = aUTH_TOKEN;
	}

	public List<Product> getOblist() {
		return oblist;
	}

	public void setOblist(List<Product> oblist) {
		this.oblist = oblist;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

}