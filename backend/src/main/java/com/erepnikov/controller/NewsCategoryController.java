package com.erepnikov.controller;

import com.erepnikov.controller.exceptions.ServerErrorException;
import com.erepnikov.domain.NewsCategory;
import com.erepnikov.service.NewsCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class NewsCategoryController {

    private NewsCategoryService newsCategoryService;

    @Autowired
    public NewsCategoryController(NewsCategoryService newsCategoryService) {
        this.newsCategoryService = newsCategoryService;
    }

    @PostMapping("/news-category")
    public ResponseEntity<Void> createNewsCategory(@RequestBody NewsCategory newsCategory) throws ServerErrorException {
        if (newsCategory.getId() != null) {
            throw new ServerErrorException("NewsCategory already have an ID");
        }
        this.newsCategoryService.save(newsCategory);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/news-category")
    public void updateNewsCategory(@RequestBody NewsCategory newsCategory) throws ServerErrorException {
        if (newsCategory.getId() == null) {
            this.createNewsCategory(newsCategory);
        }
        this.newsCategoryService.save(newsCategory);
    }

    @DeleteMapping("/news-category/{id}")
    public ResponseEntity<Void> deleteNewsCategory(@PathVariable Integer id) {
        this.newsCategoryService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
