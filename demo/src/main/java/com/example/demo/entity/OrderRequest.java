package com.example.demo.entity;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private Order order;
    private List<Product> products;

}
