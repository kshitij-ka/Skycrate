package com.example.myserver.repositories;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import com.example.myserver.models.User;
public interface UserRepository extends CrudRepository<User,Integer> {
    Optional<User> findByEmail(String email);
    /*
    // might use later
     Optional<User> findByVerificationCode(String verificationCode);
     */

}
