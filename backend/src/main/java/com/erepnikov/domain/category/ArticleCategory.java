package com.erepnikov.domain.category;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "article_category")
public class ArticleCategory extends AbstractCategory {

    private static final long serialVersionUID = 1L;
}
