package com.erepnikov.service.comment;

import com.erepnikov.domain.comment.ArticleComment;
import com.erepnikov.repository.comment.ArticleCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticleCommentService {

    private ArticleCommentRepository articleCommentRepository;

    @Autowired
    public ArticleCommentService(ArticleCommentRepository articleCommentRepository) {
        this.articleCommentRepository = articleCommentRepository;
    }

    public void save(ArticleComment comment) {
        this.articleCommentRepository.save(comment);
    }

    public ArticleComment get(Integer id) {
        return this.articleCommentRepository.findOne(id);
    }

    public void delete(Integer id) {
        this.articleCommentRepository.delete(id);
    }
}
