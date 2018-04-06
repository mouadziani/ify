package com.erepnikov.web.rest.comment;

import com.erepnikov.domain.comment.VideoComment;
import com.erepnikov.security.SecurityUtils;
import com.erepnikov.service.comment.VideoCommentService;
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
public class VideoCommentController {

    private VideoCommentService videoCommentService;

    private UserService userService;

    @Autowired
    public VideoCommentController(VideoCommentService videoCommentService, UserService userService) {
        this.videoCommentService = videoCommentService;
        this.userService = userService;
    }

    @PostMapping("/video/comment")
    public ResponseEntity<Void> createComment(@RequestBody VideoComment comment) {
        SecurityUtils.getCurrentUserLogin().ifPresent(
                login -> this.userService.getUserWithAuthoritiesByLogin(login).ifPresent(comment::setUser)
        );
        this.videoCommentService.save(comment);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
