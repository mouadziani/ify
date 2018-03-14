package com.erepnikov.repository;

import com.erepnikov.domain.ArticleCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleCategoryRepository extends JpaRepository<ArticleCategory, Integer> {
}
