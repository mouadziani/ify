package com.erepnikov.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "news")
public class News extends AbstractPost implements Serializable {

    private static final long serialVersionUID = 1L;

    @ManyToOne
    @JoinColumn(name = "video_category_id")
    private VideoCategory videoCategory;

    public VideoCategory getVideoCategory() {
        return videoCategory;
    }

    public void setVideoCategory(VideoCategory videoCategory) {
        this.videoCategory = videoCategory;
    }
}
