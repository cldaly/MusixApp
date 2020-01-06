package com.pyramid.musicapp.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pyramid.musicapp.model.User;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);
	
	@Transactional
	@Modifying(clearAutomatically = true)
	@Query("update User u set u.profileImage=:image where u.id=:userId")
	void updateProfileImage(byte[] image, Long userId);
	
	@Transactional
	@Modifying
	@Query("update User u set u.password=:password where u.id=:userId")
	void updatePassword(String password, Long userId);

}
