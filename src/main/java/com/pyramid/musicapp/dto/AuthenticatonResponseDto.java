package com.pyramid.musicapp.dto;

public class AuthenticatonResponseDto {
	final private String jwt;
	final private Long user_id;
	
	public AuthenticatonResponseDto(String jwt, Long user_id) {
		this.jwt = jwt;
		this.user_id = user_id;
	}

	public String getJwt() {
		return jwt;
	}

	public Long getUser_id() {
		return user_id;
	}
	
	
	

}
