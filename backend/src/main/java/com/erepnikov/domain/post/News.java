package com.erepnikov.domain.post;

import com.erepnikov.domain.category.NewsCategory;
import com.erepnikov.domain.comment.NewsComment;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "news")
public class News extends AbstractPost implements Serializable {

    private static final long serialVersionUID = 1L;

    @ManyToOne
    @JoinColumn(name = "news_category_id")
    private NewsCategory category;

    @OneToMany(mappedBy = "news")
    private List<NewsComment> comments = new ArrayList<>();

    public NewsCategory getCategory() {
        return category;
    }

    public void setCategory(NewsCategory category) {
        this.category = category;
    }

    public List<NewsComment> getComments() {
        return comments;
    }

    public void setComments(List<NewsComment> comments) {
        this.comments = comments;
    }
}
