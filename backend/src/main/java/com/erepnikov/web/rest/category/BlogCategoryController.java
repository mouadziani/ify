package com.erepnikov.web.rest.category;

import com.erepnikov.domain.category.BlogCategory;
import com.erepnikov.service.category.BlogCategoryService;
import com.erepnikov.web.exceptions.ServerErrorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BlogCategoryController {

    private BlogCategoryService blogCategoryService;

    @Autowired
    public BlogCategoryController(BlogCategoryService blogCategoryService) {
        this.blogCategoryService = blogCategoryService;
    }

    @GetMapping("/blog-category")
    public ResponseEntity<List<BlogCategory>> getAllBlogCategories() {
        return new ResponseEntity<>(this.blogCategoryService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/blog-category/{id}")
    public ResponseEntity<BlogCategory> getBlogCategory(@PathVariable Integer id) {
        return new ResponseEntity<>(this.blogCategoryService.get(id), HttpStatus.OK);
    }

    @PostMapping("/blog-category")
    public ResponseEntity<Void> createBlogCategory(@RequestBody BlogCategory blogCategory) throws ServerErrorException {
        if (blogCategory.getId() != null) {
            throw new ServerErrorException("BlogCategory already have an ID");
        }
        this.blogCategoryService.save(blogCategory);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/blog-category")
    public void updateBlogCategory(@RequestBody BlogCategory blogCategory) throws ServerErrorException {
        if (blogCategory.getId() == null) {
            this.createBlogCategory(blogCategory);
        }
        this.blogCategoryService.save(blogCategory);
    }

    @DeleteMapping("/blog-category/{id}")
    public ResponseEntity<Void> deleteBlogCategory(@PathVariable Integer id) {
        this.blogCategoryService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
