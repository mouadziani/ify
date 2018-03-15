package com.erepnikov.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "news")
public class News extends AbstractPost implements Serializable {

    private static final long serialVersionUID = 1L;

    @ManyToOne
    @JoinColumn(name = "news_category_id")
    private NewsCategory newsCategory;

    public NewsCategory getNewsCategory() {
        return newsCategory;
    }

    public void setNewsCategory(NewsCategory newsCategory) {
        this.newsCategory = newsCategory;
    }
}
