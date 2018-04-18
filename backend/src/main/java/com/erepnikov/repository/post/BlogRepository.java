package com.erepnikov.repository.post;

import com.erepnikov.domain.post.Blog;
import com.erepnikov.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {

    Page<Blog> findAllByUser(Pageable pageable, User user);
}
