package com.pyramid.musicapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pyramid.musicapp.model.Album;
import com.pyramid.musicapp.repository.AlbumCrudRepository;
import com.pyramid.musicapp.repository.UserRepository;

@Service
public class AlbumService {
	
	
	@Autowired
	private AlbumCrudRepository acr;
	
	@Autowired
	private UserRepository ur;

	public Optional<Album> saveAlbum(Album album,Long userId) throws Exception {
		
		ur.findById(userId).map(user -> {
			album.setUser(user);
            return acr.save(album);
		}).orElseThrow(() -> new Exception("User Not Found"));
		return this.getAlbumById(album.getId());
	}
	
	public List<Album> getAllAlbums(Long userId) throws Exception {
		Optional<List<Album>> albums = acr.findByUserId(userId);
		if (albums.isPresent()) {
			return albums.get();
		} else {
			return new ArrayList<>();
		}
		
	}
	
	public Optional<Album> getAlbumById(Integer id) {
		return acr.findById(id);
	}
	
	public void deleteAlbum(Integer id) {
		acr.deleteById(id);
	}
	
	

}
