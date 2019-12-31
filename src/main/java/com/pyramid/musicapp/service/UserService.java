package com.pyramid.musicapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pyramid.musicapp.model.RegisterStatus;
import com.pyramid.musicapp.model.User;
import com.pyramid.musicapp.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;
	
	// Get a user by id
	public Optional<User> getUserById(Long id) {
		return userRepo.findById(id);
	}
	
	// Get a list of all users
	public List<User> getUserList() {
		List<User> users = new ArrayList<User>();
		userRepo.findAll().forEach(users::add);
		return users;
	}
	
	// Add a new user to database
	public RegisterStatus saveUser(User user) {
		List<User> users = this.getUserList();
		for (User u : users) {
			if (user.getEmail().equals(u.getEmail())) 
				return new RegisterStatus(false, "Email '" +user.getEmail()+ "'  already taken");
			if (user.getEmail().equals(u.getEmail()))
				return new RegisterStatus(false, "Username '" + user.getEmail() + "' already taken");
		}
		userRepo.save(user);
		return new RegisterStatus(true, "Success!");
	}
	
	// authenticate user
	public User authenticate(String username, String password){
		List<User> users = this.getUserList();
		for (User u : users) {
			if (u.getEmail().equals(username) && u.getPassword().equals(password)) {
				u.setToken("access-token");
				return u;
			}
		}
		return null;
	}
}