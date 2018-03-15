package com.erepnikov.service;

import com.erepnikov.domain.ArticleCategory;
import com.erepnikov.repository.ArticleCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticleCategoryService {

    private ArticleCategoryRepository articleCategoryRepository;

    @Autowired
    public ArticleCategoryService(ArticleCategoryRepository articleCategoryRepository) {
        this.articleCategoryRepository = articleCategoryRepository;
    }

    public void save(ArticleCategory articleCategory) {
        this.articleCategoryRepository.save(articleCategory);
    }

    public void delete(Integer id) {
        this.articleCategoryRepository.delete(id);
    }
}
