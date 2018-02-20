package com.erepnikov.service;

import com.erepnikov.domain.user.User;
import com.erepnikov.model.user.TokenUser;
import com.erepnikov.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Class UserDetailService
 *
 * @author Egor Repnikov
 * @since 21.02.2018
 */
@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    private UserRepository userRepository;

    private AccountStatusUserDetailsChecker detailsChecker = new AccountStatusUserDetailsChecker();

    @Autowired
    public UserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByUsername(username);
        TokenUser currentUser;
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        } else {
            currentUser = new TokenUser(user);
        }
        detailsChecker.check(currentUser);
        return currentUser;
    }
}
