package com.example.demo.model;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
    private long id;
    private String password, name;

    public User() {

    }

    public User(long id, String password, String name) {
        this.id = id;
        this.password = password;
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
