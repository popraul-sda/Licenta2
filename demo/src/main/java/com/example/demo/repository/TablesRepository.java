package com.example.demo.repository;

import com.example.demo.entity.Tables;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface TablesRepository extends CrudRepository<Tables, Long> {
    List<Tables> findAll();

    Optional<Tables> findById(Long id);
}
