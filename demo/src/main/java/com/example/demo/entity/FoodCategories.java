package com.example.demo.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "food_categories")
public class FoodCategories implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    @Column(name = "NAME")
    private String name;
    @Column(name = "PICTURE")
    private String picture;


    public FoodCategories() {
    }

    public FoodCategories(Long id, String name, String picture) {
        this.id = id;
        this.name = name;
        this.picture = picture;
    }

}
