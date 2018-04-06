package com.erepnikov.service.post;

import com.erepnikov.domain.post.Article;
import com.erepnikov.repository.post.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {

    private ArticleRepository articleRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public void save(Article article) {
        this.articleRepository.save(article);
    }

    public Page<Article> getAll(Pageable pageable) {
        return this.articleRepository.findAll(pageable);
    }

    public Article get(Integer id) {
        return this.articleRepository.findOne(id);
    }

    public void delete(Integer id) {
        this.articleRepository.delete(id);
    }
}
