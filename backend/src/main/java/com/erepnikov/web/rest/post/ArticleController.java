package com.erepnikov.web.rest.post;

import com.erepnikov.web.exceptions.ServerErrorException;
import com.erepnikov.web.util.PaginationUtil;
import com.erepnikov.domain.post.Article;
import com.erepnikov.security.SecurityUtils;
import com.erepnikov.service.post.ArticleService;
import com.erepnikov.service.user.UserService;
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
public class ArticleController {

    private ArticleService articleService;

    private UserService userService;

    @Autowired
    public ArticleController(ArticleService articleService, UserService userService) {
        this.articleService = articleService;
        this.userService = userService;
    }

    @PostMapping("/article")
    public ResponseEntity<Article> createArticle(@RequestBody Article article) throws ServerErrorException {
        if (article.getId() != null) {
            throw new ServerErrorException("Article already have an ID");
        }
        article.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        SecurityUtils.getCurrentUserLogin().ifPresent(login ->
                this.userService.getUserWithAuthoritiesByLogin(login).ifPresent(article::setUser));
        this.articleService.save(article);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }

    @PutMapping("/article")
    public void updateArticle(@RequestBody Article article) throws ServerErrorException {
        if (article.getId() == null) {
            this.createArticle(article);
        }
        article.setUser(this.articleService.get(article.getId()).getUser());
        this.articleService.save(article);
    }

    @GetMapping("/article")
    public ResponseEntity<List<Article>> getAllArticles(Pageable pageable) {
        Page<Article> page = this.articleService.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/article");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/article/{id}")
    public ResponseEntity<Article> getArticle(@PathVariable Integer id) {
        return new ResponseEntity<>(this.articleService.get(id), HttpStatus.OK);
    }

    @DeleteMapping("/article/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Integer id) {
        this.articleService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
