package com.pyramid.musicapp.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Blob;
import java.util.List;
import java.util.Optional;

import org.apache.commons.io.IOUtils;
import org.apache.tomcat.websocket.AuthenticationException;
import org.hibernate.Hibernate;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pyramid.musicapp.service.MyUserDetailsService;
import com.pyramid.musicapp.service.JwtUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pyramid.musicapp.dto.AuthenticatonResponseDto;
import com.pyramid.musicapp.dto.LoginDto;
import com.pyramid.musicapp.model.User;
import com.pyramid.musicapp.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired 
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private MyUserDetailsService UserDetailsService;
	
	@Autowired
	private JwtUtil jwtTokenUtil;
	
	
	@PostMapping("/adduser")
	public void saveUser(@RequestParam("file") MultipartFile file, @RequestParam("user") String user) throws AuthenticationException, IOException {
		String filename = file.getOriginalFilename();
		if(filename.equals("none")) {
		File file1 = new File("src/main/resources/user.png");
	    FileInputStream input = new FileInputStream(file1);
	    file = new MockMultipartFile("file1",
	            file1.getName(), "image/png", IOUtils.toByteArray(input));
		}
		JSONObject jsonObject = new JSONObject(user);
		User u = new User();
		u.setEmail(jsonObject.getString("email"));
		u.setPassword(jsonObject.getString("password"));
		u.setProfileImage(file.getBytes());
		userService.saveUser(u);
	}
	
	@GetMapping("/getuserimage")
	public User getUserbyid(@RequestParam("user_id")Long id) {
		return userService.getUserid(id).get();
	}
	
	
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginDto login) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getEmail(),login.getPassword()));
		}catch(BadCredentialsException e){
			throw new Exception("Invaild Email or Password");
		}
	
		final UserDetails userdetails = UserDetailsService.loadUserByUsername(login.getEmail());
		final String jwt = jwtTokenUtil.generateToken(userdetails);
		
		return ResponseEntity.ok(new AuthenticatonResponseDto(jwt,userService.getUserByEmail(userdetails.getUsername()).getId()));
		
	}

}