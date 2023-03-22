//package com.example.demo.service;
//
//import com.example.demo.dao.ProductServiceDAO;
//import com.example.demo.dao.UserServiceDAO;
//import com.example.demo.model.ProductDTO;
//import com.example.demo.model.UserDTO;
//import com.example.demo.repository.ProductRepository;
//import com.example.demo.repository.UserRepository;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.stream.Collectors;
//
//@RestController
//public class UserServiceController {
//    final UserRepository userRepository;
//    final UserServiceDAO userServiceDAO;
//
//    public UserServiceController(UserRepository userRepository, UserServiceDAO userServiceDAO) {
//        this.userRepository = userRepository;
//        this.userServiceDAO = userServiceDAO;
//    }
//
//    @RequestMapping(value = "/users")
//    public ResponseEntity<Object> getProducts() {
//        return new ResponseEntity<>(userRepository.findAll().stream().map(o -> new UserDTO(o.getId(), o.getPassword(), o.getName()))
//                .collect(Collectors.toList()), HttpStatus.OK);
//    }
//}
