package com.example.demo.service;
import com.example.demo.entity.Authority;
import com.example.demo.entity.User;
import com.example.demo.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class RegisterServiceController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @PostMapping("/register")
    public ResponseEntity<Object> createUser(@RequestBody User userDTO){

        List<Authority> authorityList=new ArrayList<>();

        authorityList.add(createAuthority("USER","User role"));

        User user=new User();

        user.setUserName(userDTO.getUserName());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPhoneNumber(userDTO.getPhoneNumber());


        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setEnabled(true);
        user.setAuthorities(authorityList);

        userDetailsRepository.save(user);


        return new ResponseEntity<>("User Data Added", HttpStatus.OK);
    }

    private Authority createAuthority(String roleCode,String roleDescription) {
        Authority authority=new Authority();
        authority.setRoleCode(roleCode);
        authority.setRoleDescription(roleDescription);
        return authority;
    }
}