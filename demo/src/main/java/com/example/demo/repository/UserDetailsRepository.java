package com.example.demo.repository;

import com.example.demo.persitence.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserDetailsRepository extends JpaRepository<User, Long> {

    User findByUserName(String userName);

}