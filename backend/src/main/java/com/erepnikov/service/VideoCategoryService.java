package com.erepnikov.service;

import com.erepnikov.domain.VideoCategory;
import com.erepnikov.repository.VideoCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoCategoryService {

    private VideoCategoryRepository videoCategoryRepository;

    @Autowired
    public VideoCategoryService(VideoCategoryRepository videoCategoryRepository) {
        this.videoCategoryRepository = videoCategoryRepository;
    }

    public void save(VideoCategory videoCategory) {
        this.videoCategoryRepository.save(videoCategory);
    }

    public void delete(Integer id) {
        this.videoCategoryRepository.delete(id);
    }

    public VideoCategory get(Integer id) {
        return this.videoCategoryRepository.findOne(id);
    }

    public List<VideoCategory> getAll() {
        return this.videoCategoryRepository.findAll();
    }
}
