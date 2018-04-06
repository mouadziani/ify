package com.erepnikov.web.rest.comment;

import com.erepnikov.domain.comment.NewsComment;
import com.erepnikov.security.SecurityUtils;
import com.erepnikov.service.comment.NewsCommentService;
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
public class NewsCommentController {

    private NewsCommentService newsCommentService;

    private UserService userService;

    @Autowired
    public NewsCommentController(NewsCommentService newsCommentService, UserService userService) {
        this.newsCommentService = newsCommentService;
        this.userService = userService;
    }

    @PostMapping("/news/comment")
    public ResponseEntity<Void> createComment(@RequestBody NewsComment comment) {
        SecurityUtils.getCurrentUserLogin().ifPresent(
                login -> this.userService.getUserWithAuthoritiesByLogin(login).ifPresent(comment::setUser)
        );
        this.newsCommentService.save(comment);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}