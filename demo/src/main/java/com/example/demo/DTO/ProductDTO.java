package com.example.demo.DTO;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
public class ProductDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private String description;
    private String price;
    private String category;

    private String image;

    private String active;


    public ProductDTO() {
    }

    public ProductDTO(Long id, String name, String description, String price, String category, String image, String active) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.image = image;
        this.active = active;
    }
}
