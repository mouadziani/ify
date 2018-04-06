package com.erepnikov.domain.post;

import com.erepnikov.domain.category.ArticleCategory;
import com.erepnikov.domain.comment.ArticleComment;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "article")
public class Article extends AbstractPost implements Serializable {

    private static final long serialVersionUID = 1L;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ArticleCategory category;

    @OneToMany(mappedBy = "article")
    private List<ArticleComment> comments = new ArrayList<>();

    public ArticleCategory getCategory() {
        return category;
    }

    public void setCategory(ArticleCategory category) {
        this.category = category;
    }

    public List<ArticleComment> getComments() {
        return comments;
    }

    public void setComments(List<ArticleComment> comments) {
        this.comments = comments;
    }
}
