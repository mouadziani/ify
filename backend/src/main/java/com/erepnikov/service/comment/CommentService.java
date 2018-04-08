package com.erepnikov.service.comment;

import com.erepnikov.domain.comment.Comment;
import com.erepnikov.repository.comment.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    private CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public void save(Comment comment) {
        this.commentRepository.save(comment);
    }

    public Comment get(Integer id) {
        return this.commentRepository.findOne(id);
    }

    public Page<Comment> getAll(Pageable pageable) {
        return this.commentRepository.findAll(pageable);
    }

    public void delete(Integer id) {
        this.commentRepository.delete(id);
    }
}
