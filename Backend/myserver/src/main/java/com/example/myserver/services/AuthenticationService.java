package com.example.myserver.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.myserver.dtos.LoginUserDto;
import com.example.myserver.dtos.RegisterUserDto;
import com.example.myserver.models.User;
import com.example.myserver.repositories.UserRepository;

@Service
public class AuthenticationService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService( UserRepository userRepository, AuthenticationManager authenticationManager , PasswordEncoder passwordEncoder){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
        this.authenticationManager=authenticationManager;
    }

    public User signUp(RegisterUserDto inputuser){
        User user=new User(inputuser.getFirstname(),inputuser.getLastname(),inputuser.getEmail(),passwordEncoder.encode(inputuser.getPassword()));
        /*
        User user = new User()
        .setFullname(inputuser.getFirstname(),inputuser.getLastname())
        .setEmail(inputuser.getEmail())
        .setPassword(passwordEncoder.encode(inputuser.getPassword()));
        */

        return userRepository.save(user) ;
    }

    public User authenticate(LoginUserDto inputuser){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(inputuser.getEmail()
                                            , inputuser.getPassword()));
        return userRepository.findByEmail(inputuser.getEmail()).orElseThrow();

    }

}
