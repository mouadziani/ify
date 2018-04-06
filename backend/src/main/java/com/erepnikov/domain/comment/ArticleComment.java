package com.erepnikov.domain.comment;

import com.erepnikov.domain.post.Article;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "article_comments")
public class ArticleComment extends AbstractComment implements Serializable {

    private static final long serialVersionUID = 1L;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }
}
