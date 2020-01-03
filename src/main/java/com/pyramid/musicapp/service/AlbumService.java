package com.pyramid.musicapp.service;

import java.util.List;

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

	public void saveAlbum(Album album,Long userId) throws Exception {
		 ur.findById(userId).map(user -> {
            album.setUser(user);
            return acr.save(album);
        }).orElseThrow(() -> new Exception("User Not Found"));	
	}
	
	public List<Album> getAllAlbums(Long userId) throws Exception {
		List<Album> albums = acr.findByUserId(userId).orElseThrow(() -> new Exception("No Recommened Album Found"));
		return albums;
	}
	
	public String deleteAlbum(int id) {
		acr.deleteById(id);
		return "Album Successfully Deleted";
	}
	
	

}
