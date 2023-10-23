package com.spring.response;

import com.spring.model.Bufcart;

import java.util.List;

public class ServerResponse {
	private String status;
	private String message;
	private String authToken;
	private String userType;

	private List<Bufcart> oblist;

	public String getAuthToken() {
		return authToken;
	}

	public void setAuthToken(String authToken) {
		this.authToken = authToken;
	}

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

	public ServerResponse() {
		super();
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public List<Bufcart> getOblist() {
		return oblist;
	}

	public void setOblist(List<Bufcart> oblist) {
		this.oblist = oblist;
	}

}
