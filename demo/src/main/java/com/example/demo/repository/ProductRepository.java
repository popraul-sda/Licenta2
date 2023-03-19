package com.example.demo.repository;

import com.example.demo.persitence.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends CrudRepository<Product, Long> {

    List<Product> findAll();

    Optional<Product> findById(Long id);
}
