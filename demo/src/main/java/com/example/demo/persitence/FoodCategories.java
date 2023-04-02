package com.example.demo.persitence;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "food_categories")
public class FoodCategories implements Serializable {
    private long id;
    private String name,picture;


    public FoodCategories() {
    }

    public FoodCategories(Long id, String name, String picture) {
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
