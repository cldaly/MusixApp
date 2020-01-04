package com.pyramid.musicapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pyramid.musicapp.model.Album;
import com.pyramid.musicapp.service.AlbumService;
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/albums")
@RestController
public class AlbumController {

	@Autowired
	private AlbumService as;
	

	@GetMapping("/getalbums")
	public List<Album> getAllAlbums(@RequestParam(name="user_id")Long userId) throws Exception {
		return as.getAllAlbums(userId);
	}
	
	@PostMapping("/addalbum")
	public Optional<Album> addAlbum(@RequestBody Album album, @RequestParam(name="user_id")Long userId) throws Exception {
		 return as.saveAlbum(album,userId);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteAlbum(@PathVariable int id) {
		as.deleteAlbum(id);
	}
	

	
	
}
