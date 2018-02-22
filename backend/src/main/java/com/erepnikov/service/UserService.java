package com.erepnikov.service;

import com.erepnikov.domain.user.User;
import com.erepnikov.model.user.Role;
import com.erepnikov.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Class UserService
 *
 * @author Egor Repnikov
 * @since 21.02.2018
 */
@Service
public class UserService {

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getUserByUsernameAndPassword(String username, String password) {
        User result = null;
        User user = this.userRepository.findByUsername(username);
        if (user != null && this.passwordEncoder.matches(password, user.getPassword())) {
            result = user;
        }
        return result;
    }

    public String getLoggedInUsername(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null){
            return "nosession";
        }
        return auth.getName();
    }


    public User getLoggedInUser() {
        String loggedInUsername = this.getLoggedInUsername();
        return this.getUserByUsername(loggedInUsername);
    }

    public User getUserByUsername(String username){
        return this.userRepository.findByUsername(username);
    }

    public boolean addNewUser(User user) {
        boolean result = false;
        if (this.validateUser(user)) {
            user.setRole(Role.USER);
            user.setPassword(this.passwordEncoder.encode(user.getPassword()));
            this.userRepository.save(user);
            System.out.println(user.toString());
            result = true;
        }
        return result;
    }

    private boolean validateUser(User user) {
        return this.userRepository.findByUsername(user.getUsername()) == null &&
                user.getUsername() != null && user.getUsername().length() > 3 &&
                user.getPassword() != null && user.getPassword().length() > 5 &&
                user.getFirstName() != null && user.getFirstName().length() > 3 &&
                user.getLastName() != null && user.getLastName().length() > 1 &&
                user.getEmail() != null;
    }
}
