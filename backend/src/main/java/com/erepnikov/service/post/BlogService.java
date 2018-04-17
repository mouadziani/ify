package com.erepnikov.service.post;

import com.erepnikov.domain.post.Blog;
import com.erepnikov.repository.post.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BlogService {

    private BlogRepository blogRepository;

    @Autowired
    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public void save(Blog article) {
        this.blogRepository.save(article);
    }

    public Page<Blog> getAll(Pageable pageable) {
        return this.blogRepository.findAll(pageable);
    }

    public Blog get(Integer id) {
        return this.blogRepository.findOne(id);
    }

    public void delete(Integer id) {
        this.blogRepository.delete(id);
    }
}
