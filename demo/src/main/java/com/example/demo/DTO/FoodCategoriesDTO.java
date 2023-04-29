package com.example.demo.DTO;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
public class FoodCategoriesDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name,picture;


    public FoodCategoriesDTO() {
    }

    public FoodCategoriesDTO(Long id, String name, String picture) {
        this.id = id;
        this.name = name;
        this.picture = picture;
    }

}
