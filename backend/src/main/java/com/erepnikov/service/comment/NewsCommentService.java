package com.erepnikov.service.comment;

import com.erepnikov.domain.comment.NewsComment;
import com.erepnikov.repository.comment.NewsCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewsCommentService {

    private NewsCommentRepository newsCommentRepository;

    @Autowired
    public NewsCommentService(NewsCommentRepository newsCommentRepository) {
        this.newsCommentRepository = newsCommentRepository;
    }

    public void save(NewsComment comment) {
        this.newsCommentRepository.save(comment);
    }

    public void delete(Integer id) {
        this.newsCommentRepository.delete(id);
    }
}
