package com.example.demo.service;
import com.example.demo.dao.ProductServiceDAO;
import com.example.demo.model.ProductDTO;
import com.example.demo.persitence.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class ProductServiceController {

    private static Map<Long, ProductDTO> productMap = new HashMap<>();
    final ProductRepository productRepository;
    final ProductServiceDAO productServiceDAO;

    public ProductServiceController(ProductRepository productRepository, ProductServiceDAO productServiceDAO) {
        this.productRepository = productRepository;
        this.productServiceDAO = productServiceDAO;
    }

    @RequestMapping(value = "/products")
    public ResponseEntity<Object> getProducts() {
        return new ResponseEntity<>(productRepository.findAll().stream().map(o -> new ProductDTO(o.getId(), o.getName(),
                o.getDescription(), o.getPrice(), o.getCategory())).collect(Collectors.toList()), HttpStatus.OK);
    }

    @RequestMapping(value = "/products", method = RequestMethod.POST)
    public ResponseEntity<Object> createProduct(@RequestBody ProductDTO productDTO){
        Product product = new Product();
        product.setDescription(productDTO.getDescription());
        product.setCategory(productDTO.getCategory());
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        productRepository.save(product);
        return new ResponseEntity<>("Product Data Added", HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/products/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteProduct(@PathVariable("id") Long id){
        productRepository.deleteById(id);
        return new ResponseEntity<>("Product Data Deleted", HttpStatus.OK);
    }
}