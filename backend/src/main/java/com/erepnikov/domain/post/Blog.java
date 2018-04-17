package com.erepnikov.domain.post;

import com.erepnikov.domain.category.BlogCategory;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "blog")
public class Blog extends AbstractPost {

    @ManyToOne
    @JoinColumn(name = "blog_category_id")
    private BlogCategory category;

    public BlogCategory getCategory() {
        return category;
    }

    public void setCategory(BlogCategory category) {
        this.category = category;
    }
}
