package com.erepnikov.service.category;

import com.erepnikov.domain.category.ArticleCategory;
import com.erepnikov.repository.category.ArticleCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public ArticleCategory get(Integer id) {
        return this.articleCategoryRepository.findOne(id);
    }

    public List<ArticleCategory> getAll() {
        return this.articleCategoryRepository.findAll();
    }
}
