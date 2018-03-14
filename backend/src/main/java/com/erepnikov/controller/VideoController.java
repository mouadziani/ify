package com.erepnikov.controller;

import com.erepnikov.controller.exceptions.ServerErrorException;
import com.erepnikov.controller.util.PaginationUtil;
import com.erepnikov.domain.Video;
import com.erepnikov.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class VideoController {

    private VideoService videoService;

    @Autowired
    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping("/video")
    public ResponseEntity<Void> createVideo(@RequestBody Video video) throws ServerErrorException {
        if (video.getId() != null) {
            throw new ServerErrorException("Video already have an ID");
        }
        this.videoService.save(video);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/video")
    public void updateVideo(@RequestBody Video video) throws ServerErrorException {
        if (video.getId() == null) {
            this.createVideo(video);
        }
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
