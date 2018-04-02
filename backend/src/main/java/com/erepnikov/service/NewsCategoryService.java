package com.erepnikov.service;

import java.util.List;

import com.erepnikov.domain.NewsCategory;
import com.erepnikov.repository.NewsCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewsCategoryService {

    private NewsCategoryRepository newsCategoryRepository;

    @Autowired
    public NewsCategoryService(NewsCategoryRepository newsCategoryRepository) {
        this.newsCategoryRepository = newsCategoryRepository;
    }

    public void save(NewsCategory newsCategory) {
        this.newsCategoryRepository.save(newsCategory);
    }

    public void delete(Integer id) {
        this.newsCategoryRepository.delete(id);
    }

    public NewsCategory get(Integer id) {
        return this.newsCategoryRepository.findOne(id);
    }

    public List<NewsCategory> getAll() {
        return this.newsCategoryRepository.findAll();
    }
}
