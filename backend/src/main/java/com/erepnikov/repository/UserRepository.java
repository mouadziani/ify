package com.erepnikov.repository;

import com.erepnikov.domain.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Interface UserRepository (CrudRepository)
 *
 * @author Egor Repnikov
 * @since 21.02.2018
 */
@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    User findByUsername(String username);

    User findByUsernameAndPassword(String userId, String password);
}
