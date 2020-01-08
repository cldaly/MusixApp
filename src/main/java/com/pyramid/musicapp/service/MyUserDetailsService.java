package com.pyramid.musicapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pyramid.musicapp.model.CustomUserDetails;
import com.pyramid.musicapp.model.User;
import com.pyramid.musicapp.repository.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository ur;
	
	@Override
	public UserDetails loadUserByUsername(String username) {
		
		Optional<User> user = ur.findByEmail(username);
		user.orElseThrow(() -> new UsernameNotFoundException("Bad Credentials"));
		return new CustomUserDetails(user.get());
	}

}
