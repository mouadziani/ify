package com.erepnikov.domain.comment;

import com.erepnikov.domain.post.Video;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "video_comments")
public class VideoComment extends AbstractComment implements Serializable {

    private static final long serialVersionUID = 1L;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "video_id", nullable = false)
    private Video video;

    public Video getVideo() {
        return video;
    }

    public void setVideo(Video video) {
        this.video = video;
    }
}
