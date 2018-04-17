package com.erepnikov.web.rest.post;

import com.erepnikov.domain.comment.CommentDiscriminators;
import com.erepnikov.domain.post.Blog;
import com.erepnikov.service.comment.CommentService;
import com.erepnikov.service.post.BlogService;
import com.erepnikov.service.user.UserService;
import com.erepnikov.web.exceptions.ServerErrorException;
import com.erepnikov.web.util.PaginationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/api")
public class BlogController {

    private BlogService blogService;

    private UserService userService;

    private CommentService commentService;

    @Autowired
    public BlogController(BlogService blogService, UserService userService, CommentService commentService) {
        this.blogService = blogService;
        this.userService = userService;
        this.commentService = commentService;
    }

    @PostMapping("/blog")
    public ResponseEntity<Blog> createBlog(@RequestBody Blog blog) throws ServerErrorException {
        if (blog.getId() != null) {
            throw new ServerErrorException("Article already have an ID");
        }
        blog.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        this.userService.getUserWithAuthorities().ifPresent(blog::setUser);
        this.blogService.save(blog);
        return new ResponseEntity<>(blog, HttpStatus.OK);
    }

    @PutMapping("/blog")
    public void updateBlog(@RequestBody Blog blog) throws ServerErrorException {
        if (blog.getId() == null) {
            this.createBlog(blog);
        }
        blog.setUser(this.blogService.get(blog.getId()).getUser());
        this.blogService.save(blog);
    }

    @GetMapping("/blog")
    public ResponseEntity<List<Blog>> getAllBlogs(Pageable pageable) {
        Page<Blog> page = this.blogService.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/blog");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/blog/{id}")
    public ResponseEntity<Blog> getBlog(@PathVariable Integer id) {
        return new ResponseEntity<>(this.blogService.get(id), HttpStatus.OK);
    }

    @DeleteMapping("/blog/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Integer id) {
        this.commentService.delete(CommentDiscriminators.BLOG_DISCRIMINATOR, id);
        this.blogService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
