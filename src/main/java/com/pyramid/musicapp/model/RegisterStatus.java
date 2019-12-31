package com.pyramid.musicapp.model;

public class RegisterStatus {
	private boolean registered;
	private String message;
	
	public RegisterStatus(boolean registered, String message) {
		this.registered = registered;
		this.message = message;
	}
	
	public RegisterStatus() {}
	
	public boolean isRegistered() {
		return registered;
	}

	public void setRegistered(boolean registered) {
		this.registered = registered;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}