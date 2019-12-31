package com.pyramid.musicapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.pyramid.musicapp.model.Album;
@Repository
public interface AlbumCrudRepository extends JpaRepository<Album, Integer> {

}
