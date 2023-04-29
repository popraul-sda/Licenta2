package com.example.demo.entity;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;

@Data
@Table(name = "ORDERS")
@Entity
public class Order{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "CLIENT_NAME")
    private String clientName;

    @Column(name = "CLIENT_EMAIL")
    private String clientEmail;

    @Column(name = "CLIENT_PHONE_NUMBER")
    private String clientPhoneNumber;

    @Column(name = "CLIENT_ADDRESS")
    private String clientAddress;

    @Column(name = "PAYMENT_METHOD")
    private String paymentMethod;

    @Column(name = "CREATED_ON")
    private LocalDateTime createdAt;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "FK_ORDER", referencedColumnName = "id")
    private List<OrderItem> orderItems;

}
