package com.erepnikov.service.post;

import com.erepnikov.domain.post.Video;
import com.erepnikov.repository.post.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class VideoService {

    private VideoRepository videoRepository;

    @Autowired
    public VideoService(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    public void save(Video video) {
        this.videoRepository.save(video);
    }

    public Page<Video> getAll(Pageable pageable) {
        return this.videoRepository.findAll(pageable);
    }

    public Video get(Integer id) {
        return this.videoRepository.findOne(id);
    }

    public void delete(Integer id) {
        this.videoRepository.delete(id);
    }
}
