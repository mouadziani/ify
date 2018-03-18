package com.erepnikov;

import com.erepnikov.domain.*;
import com.erepnikov.service.*;
import com.erepnikov.service.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
public class H2Bootstrap implements CommandLineRunner {

    private NewsService newsService;

    private ArticleService articleService;

    private VideoService videoService;

    private UserService userService;

    private NewsCategoryService newsCategoryService;

    private ArticleCategoryService articleCategoryService;

    private VideoCategoryService videoCategoryService;

    @Autowired
    public H2Bootstrap(
            NewsService newsService,
            ArticleService articleService,
            VideoService videoService,
            UserService userService,
            NewsCategoryService newsCategoryService,
            ArticleCategoryService articleCategoryService,
            VideoCategoryService videoCategoryService
    ) {
        this.newsService = newsService;
        this.articleService = articleService;
        this.videoService = videoService;
        this.userService = userService;
        this.newsCategoryService = newsCategoryService;
        this.articleCategoryService = articleCategoryService;
        this.videoCategoryService = videoCategoryService;
    }

    @Override
    public void run(String... strings) throws Exception {
        UserDTO user = new UserDTO();
        user.setLogin("user");
        user.setEmail("user@user.ru");
        this.userService.registerUser(user, "password");

        NewsCategory newsCategory = new NewsCategory();
        newsCategory.setName("News Category");
        this.newsCategoryService.save(newsCategory);

        ArticleCategory articleCategory = new ArticleCategory();
        articleCategory.setName("Article Category");
        this.articleCategoryService.save(articleCategory);

        VideoCategory videoCategory = new VideoCategory();
        videoCategory.setName("Video Category");
        this.videoCategoryService.save(videoCategory);

        for (int i = 0; i < 15; i++) {
            News news = new News();
            news.setTitle("Test news number " + (i + 1));
            news.setText("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam at consectetur dolor doloribus ducimus, earum expedita harum ipsam, laborum libero mollitia necessitatibus nostrum possimus quo ratione rem veritatis vero voluptatem!");
            news.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            news.setNewsCategory(newsCategory);
            news.setUser(this.userService.getUserWithAuthoritiesByLogin("user").get());
            this.newsService.save(news);

            Article article = new Article();
            article.setTitle("Test article number" + (i + 1));
            article.setText("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam at consectetur dolor doloribus ducimus, earum expedita harum ipsam, laborum libero mollitia necessitatibus nostrum possimus quo ratione rem veritatis vero voluptatem!");
            article.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            article.setArticleCategory(articleCategory);
            article.setUser(this.userService.getUserWithAuthoritiesByLogin("user").get());
            this.articleService.save(article);

            Video video = new Video();
            video.setTitle("Test video number" + (i + 1));
            video.setText("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam at consectetur dolor doloribus ducimus, earum expedita harum ipsam, laborum libero mollitia necessitatibus nostrum possimus quo ratione rem veritatis vero voluptatem!");
            video.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            video.setVideoCategory(videoCategory);
            video.setUser(this.userService.getUserWithAuthoritiesByLogin("user").get());
            this.videoService.save(video);
        }
    }
}
