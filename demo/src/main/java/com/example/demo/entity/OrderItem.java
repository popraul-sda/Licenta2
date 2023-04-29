package com.example.demo.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Table(name = "order_items")
@Entity
public class OrderItem{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "QUANTITY")
    private Integer quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_FK", referencedColumnName = "id")
    private Product product;

}
