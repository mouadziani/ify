package com.erepnikov.service.comment;

import com.erepnikov.domain.comment.Comment;
import com.erepnikov.repository.comment.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    public List<Comment> getAllByPost(Integer postId, String type) {
        return this.commentRepository.findAllByPostIdAndTypeOrderByIdDesc(postId, type);
    }

    public void delete(Integer id) {
        this.commentRepository.delete(id);
    }

    @Transactional
    public void delete(String type, Integer id) {
        this.commentRepository.deleteAllByTypeAndPostId(type, id);
    }
}
