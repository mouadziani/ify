package com.erepnikov.domain.post;

import com.erepnikov.domain.category.VideoCategory;
import com.erepnikov.domain.comment.VideoComment;

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

    @OneToMany(mappedBy = "video")
    private List<VideoComment> comments = new ArrayList<>();

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

    public List<VideoComment> getComments() {
        return comments;
    }

    public void setComments(List<VideoComment> comments) {
        this.comments = comments;
    }
}
