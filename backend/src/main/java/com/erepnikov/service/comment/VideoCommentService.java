package com.erepnikov.service.comment;

import com.erepnikov.domain.comment.VideoComment;
import com.erepnikov.repository.comment.VideoCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VideoCommentService {

    private VideoCommentRepository videoCommentRepository;

    @Autowired
    public VideoCommentService(VideoCommentRepository videoCommentRepository) {
        this.videoCommentRepository = videoCommentRepository;
    }

    public void save(VideoComment comment) {
        this.videoCommentRepository.save(comment);
    }

    public void delete(Integer id) {
        this.videoCommentRepository.delete(id);
    }
}
