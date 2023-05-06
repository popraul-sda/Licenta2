package com.example.demo.entity;


import lombok.Data;

import javax.persistence.*;

@Data
@Table(name = "COMMENTS")
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "BODY")
    private String body;
    @Column(name = "USERNAME")
    private String username;
    @Column(name = "USER_ID")
    private String userId;
    @Column(name = "PARENT_ID")
    private String parentId;
    @Column(name = "CREATED_AT")
    private String createdAt;
}
