package com.pyramid.musicapp.repository;

import org.springframework.data.repository.CrudRepository;

import com.pyramid.musicapp.model.User;

public interface UserRepository extends CrudRepository<User, Long> {

}
