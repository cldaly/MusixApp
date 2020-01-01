package com.pyramid.musicapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pyramid.musicapp.model.RegisterStatus;
import com.pyramid.musicapp.model.User;
import com.pyramid.musicapp.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/{id}")
	public Optional<User> getUsersById(@PathVariable("id") Long id) {
		return userService.getUserById(id);
	}
	
	@GetMapping
	public List<User> getUsers() {
		return userService.getUserList();
	}
	
	@PostMapping
	public RegisterStatus addUser(@RequestBody User user) {
		return userService.saveUser(user);
	}
	
	@PostMapping("/authenticate")
	public User authenticateUser(@RequestBody User user) {
		return userService.authenticate(user.getEmail(), user.getPassword());
	}

}