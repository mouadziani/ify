package com.erepnikov.web.rest.category;

import com.erepnikov.web.exceptions.ServerErrorException;
import com.erepnikov.domain.category.ArticleCategory;
import com.erepnikov.service.category.ArticleCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ArticleCategoryController {

    private ArticleCategoryService articleCategoryService;

    @Autowired
    public ArticleCategoryController(ArticleCategoryService articleCategoryService) {
        this.articleCategoryService = articleCategoryService;
    }

    @GetMapping("/article-category")
    public ResponseEntity<List<ArticleCategory>> getAllArticleCategories() {
        return new ResponseEntity<>(this.articleCategoryService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/article-category/{id}")
    public ResponseEntity<ArticleCategory> getArticleCategory(@PathVariable Integer id) {
        return new ResponseEntity<>(this.articleCategoryService.get(id), HttpStatus.OK);
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
