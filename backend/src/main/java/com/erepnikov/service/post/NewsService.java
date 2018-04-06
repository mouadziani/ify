package com.erepnikov.service.post;

import com.erepnikov.domain.post.News;
import com.erepnikov.repository.post.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class NewsService {

    private NewsRepository newsRepository;

    @Autowired
    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    public void save(News news) {
        this.newsRepository.save(news);
    }

    public Page<News> getAll(Pageable pageable) {
        return this.newsRepository.findAll(pageable);
    }

    public News get(Integer id) {
        return this.newsRepository.findOne(id);
    }

    public void delete(Integer id) {
        this.newsRepository.delete(id);
    }
}
