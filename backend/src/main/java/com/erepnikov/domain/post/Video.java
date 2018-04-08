package com.erepnikov.domain.post;

import com.erepnikov.domain.category.VideoCategory;
import com.erepnikov.domain.comment.Comment;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "video")
public class Video extends AbstractPost implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "video_url")
    private String videoUrl;

    @ManyToOne
    @JoinColumn(name = "video_category_id")
    private VideoCategory category;

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public VideoCategory getCategory() {
        return category;
    }

    public void setCategory(VideoCategory category) {
        this.category = category;
    }
}
