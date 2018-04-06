package com.erepnikov.repository.category;

import com.erepnikov.domain.category.ArticleCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleCategoryRepository extends JpaRepository<ArticleCategory, Integer> {
}
