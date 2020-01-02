package com.pyramid.musicapp.controller;

import java.util.List;
import java.util.Optional;

import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.bind.annotation.RestController;

import com.pyramid.musicapp.service.MyUserDetailsService;
import com.pyramid.musicapp.service.JwtUtil;
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
	public void saveUser(@RequestBody User user) throws AuthenticationException {
		userService.saveUser(user);
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