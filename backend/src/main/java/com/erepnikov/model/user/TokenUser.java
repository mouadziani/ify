package com.erepnikov.model.user;

import com.erepnikov.domain.user.User;
import org.springframework.security.core.authority.AuthorityUtils;

/**
 * Class TokenUser
 *
 * @author Egor Repnikov
 * @since 21.02.2018
 */
public class TokenUser extends org.springframework.security.core.userdetails.User {

    private User user;

    public TokenUser(User user) {
        super(user.getUsername(), user.getPassword(), AuthorityUtils.createAuthorityList(user.getRole().toString()));
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public String getRole() {
        return user.getRole().toString();
    }
}
