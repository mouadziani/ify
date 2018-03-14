package com.erepnikov.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "article")
public class Article extends AbstractPost implements Serializable {

    private static final long serialVersionUID = 1L;

    @ManyToOne
    @JoinColumn(name = "article_category_id")
    private ArticleCategory articleCategory;

    public ArticleCategory getArticleCategory() {
        return articleCategory;
    }

    public void setArticleCategory(ArticleCategory articleCategory) {
        this.articleCategory = articleCategory;
    }
}
