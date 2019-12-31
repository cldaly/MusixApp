package com.pyramid.musicapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pyramid.musicapp.model.Album;
import com.pyramid.musicapp.repository.AlbumCrudRepository;
import com.pyramid.musicapp.service.AlbumService;
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/albums")
@RestController
public class AlbumController {

	@Autowired
	private AlbumService as;
	
	@GetMapping("/{albumId}")
	public Optional<Album> getAlbumById(@PathVariable int albumId) {
		return as.getAlbumById(albumId);
	}
	
	@GetMapping
	public List<Album> getAllAlbums() {
		return as.getAllAlbums();
	}
	
	@PostMapping
	public Album addAlbum(@RequestBody Album album) {
		return as.saveAlbum(album);
	}
	
	@DeleteMapping("/{albumId}")
	public String deleteAlbum(@PathVariable int albumId) {
		as.deleteAlbum(albumId);
		return "Album Successfully Deleted";
	}
	

	
	
}
