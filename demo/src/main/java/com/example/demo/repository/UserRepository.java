package com.example.demo.repository;

import com.example.demo.model.User;
import com.example.demo.persitence.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findAll();

    Optional<User> findById(Long id);
}
