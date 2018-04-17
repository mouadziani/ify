package com.erepnikov.service.category;

import com.erepnikov.domain.category.BlogCategory;
import com.erepnikov.repository.category.BlogCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogCategoryService {

    private BlogCategoryRepository blogCategoryRepository;

    @Autowired
    public BlogCategoryService(BlogCategoryRepository blogCategoryRepository) {
        this.blogCategoryRepository = blogCategoryRepository;
    }

    public void save(BlogCategory category) {
        this.blogCategoryRepository.save(category);
    }

    public void delete(Integer id) {
        this.blogCategoryRepository.delete(id);
    }

    public BlogCategory get(Integer id) {
        return this.blogCategoryRepository.findOne(id);
    }

    public List<BlogCategory> getAll() {
        return this.blogCategoryRepository.findAll();
    }
}
