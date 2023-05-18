package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.File;
import java.io.Serializable;

@Data
@Entity
@Table(name = "products")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Product{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(name = "NAME")
    private String name;
    @Column(name = "DESCRIPTION")
    private String description;
    @Column(name = "PRICE")
    private String price;
    @Column(name = "CATEGORY")
    private String category;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FILE_FK", referencedColumnName = "id")
    private FileData fileData;

    @Column(name = "ACTIVE")
    private String active;


    public Product() {
    }

    public Product(Long id, String name, String description, String price, String category, FileData fileData, String active) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.fileData = fileData;
        this.active = active;
    }

}
