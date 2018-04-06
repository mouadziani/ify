package com.erepnikov.domain.category;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "news_category")
public class NewsCategory extends AbstractCategory implements Serializable {

    private static final long serialVersionUID = 1L;
}
