package com.erepnikov.domain.post;

import com.erepnikov.domain.category.ArticleCategory;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "article")
public class Article extends AbstractPost implements Serializable {

    private static final long serialVersionUID = 1L;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ArticleCategory category;

    public ArticleCategory getCategory() {
        return category;
    }

    public void setCategory(ArticleCategory category) {
        this.category = category;
    }
}
