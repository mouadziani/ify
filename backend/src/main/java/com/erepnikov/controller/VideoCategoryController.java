package com.erepnikov.controller;

import com.erepnikov.controller.exceptions.ServerErrorException;
import com.erepnikov.domain.VideoCategory;
import com.erepnikov.service.VideoCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class VideoCategoryController {

    private VideoCategoryService videoCategoryService;

    @Autowired
    public VideoCategoryController(VideoCategoryService videoCategoryService) {
        this.videoCategoryService = videoCategoryService;
    }

    @PostMapping("/video-category")
    public ResponseEntity<Void> createVideoCategory(@RequestBody VideoCategory videoCategory) throws ServerErrorException {
        if (videoCategory.getId() != null) {
            throw new ServerErrorException("NewsCategory already have an ID");
        }
        this.videoCategoryService.save(videoCategory);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/video-category")
    public void updateVideoCategory(@RequestBody VideoCategory videoCategory) throws ServerErrorException {
        if (videoCategory.getId() == null) {
            this.createVideoCategory(videoCategory);
        }
        this.videoCategoryService.save(videoCategory);
    }

    @DeleteMapping("/video-category/{id}")
    public ResponseEntity<Void> deleteVideoCategory(@PathVariable Integer id) {
        this.videoCategoryService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
