package com.example.demo.DTO;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Data
public class TablesDTO {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private String status;
    private String location;

    private String user_id;


    public TablesDTO() {
    }

    public TablesDTO(Long id, String name, String status, String location, String user_id) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.location = location;
        this.user_id = user_id;
    }

}
