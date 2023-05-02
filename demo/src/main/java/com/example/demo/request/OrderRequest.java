package com.example.demo.request;
import com.example.demo.entity.Order;
import com.example.demo.entity.Product;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private Order order;
    private List<Product> products;
    private List<Integer> quantities;
}
