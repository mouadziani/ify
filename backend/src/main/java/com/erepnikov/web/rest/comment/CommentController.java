package com.erepnikov.web.rest.comment;

import com.erepnikov.domain.comment.Comment;
import com.erepnikov.domain.comment.CommentDiscriminators;
import com.erepnikov.security.AuthoritiesConstants;
import com.erepnikov.security.SecurityUtils;
import com.erepnikov.service.comment.CommentService;
import com.erepnikov.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {

    private CommentService commentService;

    private UserService userService;

    @Autowired
    public CommentController(CommentService commentService, UserService userService) {
        this.commentService = commentService;
        this.userService = userService;
    }

    @PostMapping("/comment/news")
    public ResponseEntity<Void> createNewsComment(@RequestBody Comment comment) {
        this.saveComment(comment, CommentDiscriminators.NEWS_DISCRIMINATOR);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/comment/news/{postId}")
    public ResponseEntity<List<Comment>> getAllNewsComments(@PathVariable Integer postId) {
        return new ResponseEntity<>(
                this.commentService.getAllByPost(postId, CommentDiscriminators.NEWS_DISCRIMINATOR),
                HttpStatus.OK
        );
    }

    @PostMapping("/comment/article")
    public ResponseEntity<Void> createArticleComment(@RequestBody Comment comment) {
        this.saveComment(comment, CommentDiscriminators.ARTICLE_DISCRIMINATOR);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/comment/article/{postId}")
    public ResponseEntity<List<Comment>> getAllArticleComments(@PathVariable Integer postId) {
        return new ResponseEntity<>(
                this.commentService.getAllByPost(postId, CommentDiscriminators.ARTICLE_DISCRIMINATOR),
                HttpStatus.OK
        );
    }

    @PostMapping("/comment/video")
    public ResponseEntity<Void> createVideoComment(@RequestBody Comment comment) {
        this.saveComment(comment, CommentDiscriminators.VIDEO_DISCRIMINATOR);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/comment/video/{postId}")
    public ResponseEntity<List<Comment>> getAllVideoComments(@PathVariable Integer postId) {
        return new ResponseEntity<>(
                this.commentService.getAllByPost(postId, CommentDiscriminators.VIDEO_DISCRIMINATOR),
                HttpStatus.OK
        );
    }

    @PostMapping("/comment/blog")
    public ResponseEntity<Void> createBlogComment(@RequestBody Comment comment) {
        this.saveComment(comment, CommentDiscriminators.BLOG_DISCRIMINATOR);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/comment/blog/{postId}")
    public ResponseEntity<List<Comment>> getAllBlogComments(@PathVariable Integer postId) {
        return new ResponseEntity<>(
                this.commentService.getAllByPost(postId, CommentDiscriminators.BLOG_DISCRIMINATOR),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/comment/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Integer id) {
        SecurityUtils.getCurrentUserLogin().ifPresent(
                login -> this.userService.getUserWithAuthoritiesByLogin(login).ifPresent(user -> {
                    if (user.equals(this.commentService.get(id).getUser()) ||
                            SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.MODERATOR)) {
                        this.commentService.delete(id);
                    }
                })
        );
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private void saveComment(Comment comment, String discriminator) {
        this.userService.getUserWithAuthorities().ifPresent(user -> {
            comment.setUser(user);
            comment.setType(discriminator);
            comment.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            this.commentService.save(comment);
        });
    }
}
