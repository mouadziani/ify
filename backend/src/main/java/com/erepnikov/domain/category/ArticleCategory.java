package com.erepnikov.domain.category;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "article_category")
public class ArticleCategory extends AbstractCategory implements Serializable {

    private static final long serialVersionUID = 1L;
}
