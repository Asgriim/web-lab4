package org.asgrim.lab4.controllers;


import lombok.RequiredArgsConstructor;
import org.asgrim.lab4.data.JwtDTO;
import org.asgrim.lab4.data.UserDTO;
import org.asgrim.lab4.entity.User;
import org.asgrim.lab4.exceptions.InvaliUserOrPasswordException;
import org.asgrim.lab4.exceptions.UserAlreadyExistsException;
import org.asgrim.lab4.security.JWT;
import org.asgrim.lab4.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    PasswordEncoder encoder = new BCryptPasswordEncoder();

    private final UserService userService;
    private final JWT jwt;


    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserDTO userDTO){
        User us = userService.loadUserByUsername(userDTO.getUsername());
        if(us == null || !encoder.matches(userDTO.getPassword(), us.getPassword())){
            System.out.println("такого нема");
            throw new InvaliUserOrPasswordException();
        }
        String jwtS = jwt.generateToken(userDTO.getUsername());
        System.out.println("new token: " + jwtS);
        return ResponseEntity.ok(new JwtDTO(userDTO.getUsername(), jwtS));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDTO userDTO){
        System.out.println(userDTO);
        if(userService.loadUserByUsername(userDTO.getUsername()) != null){
            throw new UserAlreadyExistsException();
        }
        userService.addUser(new User(userDTO.getUsername(), encoder.encode(userDTO.getPassword())));
        System.out.println("added user");
        return ResponseEntity.ok("Registered");
    }
}
