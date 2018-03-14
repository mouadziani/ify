package com.erepnikov.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "video")
public class Video extends AbstractPost implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "video_url")
    private String videoUrl;

    @ManyToOne
    @JoinColumn(name = "video_category_id")
    private VideoCategory videoCategory;

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public VideoCategory getVideoCategory() {
        return videoCategory;
    }

    public void setVideoCategory(VideoCategory videoCategory) {
        this.videoCategory = videoCategory;
    }
}