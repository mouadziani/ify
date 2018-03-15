package com.erepnikov.controller;

import com.erepnikov.controller.exceptions.ServerErrorException;
import com.erepnikov.domain.ArticleCategory;
import com.erepnikov.service.ArticleCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ArticleCategoryController {

    private ArticleCategoryService articleCategoryService;

    @Autowired
    public ArticleCategoryController(ArticleCategoryService articleCategoryService) {
        this.articleCategoryService = articleCategoryService;
    }

    @PostMapping("/article-category")
    public ResponseEntity<Void> createArticleCategory(@RequestBody ArticleCategory articleCategory) throws ServerErrorException {
        if (articleCategory.getId() != null) {
            throw new ServerErrorException("NewsCategory already have an ID");
        }
        this.articleCategoryService.save(articleCategory);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/article-category")
    public void updateArticleCategory(@RequestBody ArticleCategory articleCategory) throws ServerErrorException {
        if (articleCategory.getId() == null) {
            this.createArticleCategory(articleCategory);
        }
        this.articleCategoryService.save(articleCategory);
    }

    @DeleteMapping("/article-category/{id}")
    public ResponseEntity<Void> deleteArticleCategory(@PathVariable Integer id) {
        this.articleCategoryService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
