package com.erepnikov.repository.comment;

import com.erepnikov.domain.comment.VideoComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoCommentRepository extends JpaRepository<VideoComment, Integer> {
}
