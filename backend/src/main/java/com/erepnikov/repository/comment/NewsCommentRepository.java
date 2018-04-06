package com.erepnikov.repository.comment;

import com.erepnikov.domain.comment.NewsComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsCommentRepository extends JpaRepository<NewsComment, Integer> {
}
