package com.pyramid.musicapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pyramid.musicapp.model.Album;
import com.pyramid.musicapp.repository.AlbumCrudRepository;

@Service
public class AlbumService {
	
	
	@Autowired
	private AlbumCrudRepository acr;
	


	public Album saveAlbum(Album album) {
		return acr.save(album);
	}
	
	public List<Album> getAllAlbums() {
		List<Album> albums = new ArrayList<Album>();
		acr.findAll().forEach(albums::add);
		return albums;
	}
	
	public String deleteAlbum(int id) {
		acr.deleteById(id);
		return "Album Successfully Deleted";
	}
	
	
	
	
	
	
	
	

}
