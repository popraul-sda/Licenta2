package com.example.demo.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class FoodCategoriesDTO {
    private long id;
    private String name,picture;


    public FoodCategoriesDTO() {
    }

    public FoodCategoriesDTO(Long id, String name, String picture) {
        this.id = id;
        this.name = name;
        this.picture = picture;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
