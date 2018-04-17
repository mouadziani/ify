package com.erepnikov.domain.category;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "blog_category")
public class BlogCategory extends AbstractCategory {

    private static final long serialVersionUID = 1L;
}
