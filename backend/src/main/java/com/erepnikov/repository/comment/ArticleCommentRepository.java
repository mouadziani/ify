package com.erepnikov.repository.comment;

import com.erepnikov.domain.comment.ArticleComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleCommentRepository extends JpaRepository<ArticleComment, Integer> {
}
