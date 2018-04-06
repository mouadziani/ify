package com.erepnikov.web.rest.comment;

import com.erepnikov.domain.comment.ArticleComment;
import com.erepnikov.security.SecurityUtils;
import com.erepnikov.service.comment.ArticleCommentService;
import com.erepnikov.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ArticleCommentController {

    private ArticleCommentService articleCommentService;

    private UserService userService;

    @Autowired
    public ArticleCommentController(ArticleCommentService articleCommentService, UserService userService) {
        this.articleCommentService = articleCommentService;
        this.userService = userService;
    }

    @PostMapping("/article/comment")
    public ResponseEntity<Void> createComment(@RequestBody ArticleComment comment) {
        SecurityUtils.getCurrentUserLogin().ifPresent(
                login -> this.userService.getUserWithAuthoritiesByLogin(login).ifPresent(comment::setUser)
        );
        this.articleCommentService.save(comment);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
