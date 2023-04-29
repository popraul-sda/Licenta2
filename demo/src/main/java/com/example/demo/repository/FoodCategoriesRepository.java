package com.example.demo.repository;

import com.example.demo.entity.FoodCategories;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface FoodCategoriesRepository extends CrudRepository<FoodCategories, Long> {
    List<FoodCategories> findAll();

    Optional<FoodCategories> findById(Long id);
}
