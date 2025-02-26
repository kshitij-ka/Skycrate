package com.example.myserver.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.myserver.dtos.LoginUserDto;
import com.example.myserver.dtos.RegisterUserDto;
import com.example.myserver.models.User;
import com.example.myserver.responses.LoginResponse;
import com.example.myserver.services.AuthenticationService;
import com.example.myserver.services.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RequestMapping("/api")
@RestController
public class AuthController {
   
    private final JwtService jwtService;
    private AuthenticationService authenticationService;

    public AuthController(JwtService jwtService,AuthenticationService authenticationService){
        this.jwtService=jwtService;
        this.authenticationService=authenticationService;
    }

    @GetMapping("/test")
    public String teString(@RequestParam String param) {
        return new String();
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> LoginController(@RequestBody LoginUserDto entity) {

        User authenticatedUser=authenticationService.authenticate(entity);
        String jwtToken=jwtService.generateToken(authenticatedUser);
        
        LoginResponse loginResponse=new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirtationTime());
        return ResponseEntity.ok(loginResponse);
    }
    
    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto entity) {
        User registeredUser=authenticationService.signUp(entity);

        
        return ResponseEntity.ok(registeredUser);
    }
    

    
}
