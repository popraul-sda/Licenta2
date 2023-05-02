package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.request.OrderRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository, OrderItemRepository orderItemRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
    }

    @PostMapping("/addOrder")
    public ResponseEntity<?> addOrder(@RequestBody OrderRequest orderRequest) {

        int index = 0;

        Order order = orderRequest.getOrder();
        List<Product> products = orderRequest.getProducts();

        List<OrderItem> orderItemsList = new ArrayList<>();

        List<Integer> quantities = orderRequest.getQuantities();

        for (Product product : products) {
            OrderItem orderItem = new OrderItem();
            orderItem.setId(orderItem.getId());
            orderItem.setQuantity(quantities.get(index)); // Set the quantity to 1
            orderItem.setProduct(product);
            orderItemsList.add(orderItem);
            index++;
        }

        // Set the Order's OrderItems property
        order.setOrderItems(orderItemsList);

        // Save the Order to the database
        orderRepository.save(order);

        return ResponseEntity.ok("Order added successfully");
    }

    @GetMapping("/showOrders")
    public ResponseEntity<List<Order>> getOrders() {
        List<Order> orderList = orderRepository.findAll();
        return ResponseEntity.ok(orderList);
    }

}

