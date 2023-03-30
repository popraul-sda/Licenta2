//package com.example.demo;
//
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.web.bind.annotation.RestController;
//
//@SpringBootApplication
//@RestController
//public class ServerRestaurantApplication {
//
//	public static void main(String[] args) {
//		SpringApplication.run(ServerRestaurantApplication.class, args);
//	}
//
//}

package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import com.example.demo.persitence.Authority;
import com.example.demo.persitence.User;
import com.example.demo.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ServerRestaurantApplication {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserDetailsRepository userDetailsRepository;

	public static void main(String[] args) {
		SpringApplication.run(ServerRestaurantApplication.class, args);
	}

	@PostConstruct
	protected void init() {

//		List<Authority> authorityList=new ArrayList<>();
//
//		authorityList.add(createAuthority("ADMIN","Admin role"));
//
//		User user=new User();
//
//		user.setUserName("admin");
//		user.setFirstName("admin");
//		user.setLastName("admin");
//
//		user.setPassword(passwordEncoder.encode("admin"));
//		user.setEnabled(true);
//		user.setAuthorities(authorityList);
//
//		userDetailsRepository.save(user);



	}


	private Authority createAuthority(String roleCode,String roleDescription) {
		Authority authority=new Authority();
		authority.setRoleCode(roleCode);
		authority.setRoleDescription(roleDescription);
		return authority;
	}



}
