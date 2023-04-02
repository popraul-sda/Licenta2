package com.example.demo.service;
import com.example.demo.dao.FoodCategoriesDAO;
import com.example.demo.dao.ProductServiceDAO;
import com.example.demo.model.FoodCategoriesDTO;
import com.example.demo.model.ProductDTO;
import com.example.demo.persitence.Product;
import com.example.demo.repository.FoodCategoriesRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class FoodCategoriesServiceController {

    private static Map<Long, FoodCategoriesDTO> foodCategoriesMap = new HashMap<>();
    final FoodCategoriesRepository foodCategoriesRepository;
    final FoodCategoriesDAO foodCategoriesDAO;

    public FoodCategoriesServiceController(FoodCategoriesRepository foodCategoriesRepository, FoodCategoriesDAO foodCategoriesDAO) {
        this.foodCategoriesRepository = foodCategoriesRepository;
        this.foodCategoriesDAO = foodCategoriesDAO;
    }

    @RequestMapping(value = "/categories")
    public ResponseEntity<Object> getCategories() {
        return new ResponseEntity<>(foodCategoriesRepository.findAll().stream().map(o -> new FoodCategoriesDTO(o.getId(), o.getName(),
                o.getPicture())).collect(Collectors.toList()), HttpStatus.OK);
    }
}