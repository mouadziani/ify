package com.erepnikov.web.rest.post;

import com.erepnikov.domain.post.Video;
import com.erepnikov.service.post.VideoService;
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
public class VideoController {

    private VideoService videoService;

    private UserService userService;

    @Autowired
    public VideoController(VideoService videoService, UserService userService) {
        this.videoService = videoService;
        this.userService = userService;
    }

    @PostMapping("/video")
    public ResponseEntity<Video> createVideo(@RequestBody Video video) throws ServerErrorException {
        if (video.getId() != null) {
            throw new ServerErrorException("Video already have an ID");
        }
        video.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        this.userService.getUserWithAuthorities().ifPresent(video::setUser);
        this.videoService.save(video);
        return new ResponseEntity<>(video, HttpStatus.OK);
    }

    @PutMapping("/video")
    public void updateVideo(@RequestBody Video video) throws ServerErrorException {
        if (video.getId() == null) {
            this.createVideo(video);
        }
        video.setUser(this.videoService.get(video.getId()).getUser());
        this.videoService.save(video);
    }

    @GetMapping("/video")
    public ResponseEntity<List<Video>> getAllVideos(Pageable pageable) {
        Page<Video> page = this.videoService.getAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/video");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/video/{id}")
    public ResponseEntity<Video> getVideo(@PathVariable Integer id) {
        return new ResponseEntity<>(this.videoService.get(id), HttpStatus.OK);
    }

    @DeleteMapping("/video/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable Integer id) {
        this.videoService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
