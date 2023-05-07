package com.example.demo.service;
import com.example.demo.dao.ProductServiceDAO;
import com.example.demo.DTO.ProductDTO;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Product;
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

    @GetMapping("/products")
    public ResponseEntity<Object> getProducts() {
        return new ResponseEntity<>(productRepository.findAll().stream().map(o -> new ProductDTO(o.getId(), o.getName(),
                o.getDescription(), o.getPrice(), o.getCategory(), o.getImage())).collect(Collectors.toList()), HttpStatus.OK);
    }

    @PostMapping("/products")
    public ResponseEntity<Object> createProduct(@RequestBody ProductDTO productDTO){
        Product product = new Product();
        product.setId(product.getId());
        product.setDescription(productDTO.getDescription());
        product.setCategory(productDTO.getCategory());
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        productRepository.save(product);
        return new ResponseEntity<>("Product Data Added", HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable("id") Long id){
        productRepository.deleteById(id);
        return new ResponseEntity<>("Product Data Deleted", HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/products/{id}")
    public ResponseEntity<Object> updateProduct(@PathVariable("id") Long id, @RequestBody ProductDTO productDTO){

        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setCategory(productDTO.getCategory());
            product.setDescription(productDTO.getDescription());
            product.setImage(productDTO.getImage());
            product.setName(productDTO.getName());
            product.setPrice(productDTO.getPrice());
            productRepository.save(product);
            return ResponseEntity.ok("Product edited");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}