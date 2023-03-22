package com.example.demo.repository;

import com.example.demo.model.Utilizator;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<Utilizator, Long> {
    List<Utilizator> findAll();

    Optional<Utilizator> findById(Long id);
}
