package com.erepnikov.repository.category;

import com.erepnikov.domain.category.VideoCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoCategoryRepository extends JpaRepository<VideoCategory, Integer> {
}
