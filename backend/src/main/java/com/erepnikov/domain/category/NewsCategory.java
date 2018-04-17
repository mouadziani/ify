package com.erepnikov.domain.category;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "news_category")
public class NewsCategory extends AbstractCategory {

    private static final long serialVersionUID = 1L;
}
