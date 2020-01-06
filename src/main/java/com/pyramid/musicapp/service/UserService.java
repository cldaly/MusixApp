package com.pyramid.musicapp.service;

import java.util.Optional;

import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.pyramid.musicapp.model.User;
import com.pyramid.musicapp.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;
	
	public void saveUser(User u) throws AuthenticationException {
		if(checkDuplicateUser(u.getEmail()).isPresent()) {
			throw new AuthenticationException("This Email is already Used");
		}
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		u.setPassword(encoder.encode(u.getPassword()));
		userRepo.save(u);
	}
	
	public Optional<User> checkDuplicateUser(String email) {
		return userRepo.findByEmail(email);
	}
	
	public User getUserByEmail(String email) {
		return userRepo.findByEmail(email).get();
	}
	
	public Optional<User> getUserid(Long id){
		return userRepo.findById(id);
	}
	
	public void deleteUser(Long id) {
		userRepo.deleteById(id);
	}
	
	public void updateProfileImage(byte[] image, Long id) {
		userRepo.updateProfileImage(image, id);
	}
	
	public void updatePassword(String password, Long id) {
		userRepo.updatePassword(password, id);
	}
	
}