package com.erepnikov.repository;

import com.erepnikov.domain.VideoCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoCategoryRepository extends JpaRepository<VideoCategory, Integer> {
}
