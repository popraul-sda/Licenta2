package com.example.demo.service;
import com.example.demo.dao.TablesServiceDAO;
import com.example.demo.model.TablesDTO;
import com.example.demo.repository.TablesRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
public class TablesServiceController {

    final TablesRepository tablesRepository;

    public TablesServiceController(TablesRepository tablesRepository) {
        this.tablesRepository = tablesRepository;
    }

    @RequestMapping(value = "/tables")
    public ResponseEntity<Object> getTables() {
        return new ResponseEntity<>(tablesRepository.findAll().stream().map(o -> new TablesDTO(o.getId(), o.getName(),
                o.getStatus(), o.getLocation(), o.getUser_id())).collect(Collectors.toList()), HttpStatus.OK);
    }
}