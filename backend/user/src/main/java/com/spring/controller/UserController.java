package com.spring.controller;

import java.util.HashMap;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.constants.ResponseCode;
import com.spring.constants.WebConstants;
import com.spring.exception.AddressCustomException;
import com.spring.exception.UserCustomException;
import com.spring.model.Address;
import com.spring.model.User;
import com.spring.repository.AddressRepository;
import com.spring.repository.UserRepository;
import com.spring.response.Response;
import com.spring.response.UserResponse;
import com.spring.util.Validator;

@CrossOrigin(origins = { WebConstants.ALLOWED_URL, WebConstants.ALLOWED_URL_PROD })
@RestController
@RequestMapping("/user")
public class UserController {

	private static Logger logger = Logger.getLogger(UserController.class.getName());

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private AddressRepository addrRepo;

	@PostMapping("/addAddress")
	public ResponseEntity<UserResponse> addAddress(@RequestBody Address address, Authentication auth) {
		UserResponse resp = new UserResponse();
		if (Validator.isAddressEmpty(address)) {
			resp.setStatus(ResponseCode.BAD_REQUEST_CODE);
			resp.setMessage(ResponseCode.BAD_REQUEST_MESSAGE);
			return new ResponseEntity<UserResponse>(resp, HttpStatus.NOT_ACCEPTABLE);
		} else {
			try {
				User user = userRepo.findByUsername(auth.getName())
						.orElseThrow(() -> new UsernameNotFoundException(auth.getName()));
				Address userAddress = addrRepo.findByUser(user);
				if (userAddress != null) {
					userAddress.setAddress(address.getAddress());
					userAddress.setCity(address.getCity());
					userAddress.setCountry(address.getCountry());
					userAddress.setPhonenumber(address.getPhonenumber());
					userAddress.setState(address.getState());
					userAddress.setZipcode(address.getZipcode());
					addrRepo.save(userAddress);
				} else {
					user.setAddress(address);
					address.setUser(user);
					addrRepo.save(address);
				}
				resp.setStatus(ResponseCode.SUCCESS_CODE);
				resp.setMessage(ResponseCode.CUST_ADR_ADD);
			} catch (Exception e) {
				throw new AddressCustomException("Unable to add address, please try again");
			}
		}
		return new ResponseEntity<UserResponse>(resp, HttpStatus.OK);
	}

	@GetMapping("/getAddress")
	public ResponseEntity<Response> getAddress(Authentication auth) {
		Response resp = new Response();
		try {
			User user = userRepo.findByUsername(auth.getName()).orElseThrow(
					() -> new UserCustomException("User with username " + auth.getName() + " doesn't exists"));
			Address adr = addrRepo.findByUser(user);

			HashMap<String, String> map = new HashMap<>();
			map.put(WebConstants.ADR_NAME, adr.getAddress());
			map.put(WebConstants.ADR_CITY, adr.getCity());
			map.put(WebConstants.ADR_STATE, adr.getState());
			map.put(WebConstants.ADR_COUNTRY, adr.getCountry());
			map.put(WebConstants.ADR_ZP, String.valueOf(adr.getZipcode()));
			map.put(WebConstants.PHONE, adr.getPhonenumber());

			resp.setStatus(ResponseCode.SUCCESS_CODE);
			resp.setMessage(ResponseCode.CUST_ADR_ADD);
			resp.setMap(map);
		} catch (Exception e) {
			throw new AddressCustomException("Unable to retrieve address, please try again");
		}
		return new ResponseEntity<Response>(resp, HttpStatus.OK);
	}

	@GetMapping("/getUserInfo")
	public ResponseEntity<UserResponse> getUserInfo(Authentication auth) {
		UserResponse resp = new UserResponse();
		try {
			User user = userRepo.findByUsername(auth.getName()).orElseThrow(
					() -> new UserCustomException("User with username " + auth.getName() + " doesn't exists"));

			resp.setUser(user);
			resp.setStatus(ResponseCode.SUCCESS_CODE);
			resp.setMessage(ResponseCode.SUCCESS_MESSAGE);
		} catch (Exception e) {
			throw new UserCustomException("User with username " + auth.getName() + " doesn't exists");
		}
		return new ResponseEntity<UserResponse>(resp, HttpStatus.OK);
	}

	@GetMapping("/getTestData")
	public ResponseEntity<UserResponse> getTestData(Authentication auth) {
		UserResponse resp = new UserResponse();
		resp.setMessage("This is a test message for user");
		return new ResponseEntity<UserResponse>(resp, HttpStatus.OK);
	}
	
}
