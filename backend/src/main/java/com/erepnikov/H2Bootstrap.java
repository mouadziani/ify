package com.erepnikov;

import com.erepnikov.domain.category.ArticleCategory;
import com.erepnikov.domain.category.NewsCategory;
import com.erepnikov.domain.category.VideoCategory;
import com.erepnikov.domain.comment.ArticleComment;
import com.erepnikov.domain.comment.NewsComment;
import com.erepnikov.domain.comment.VideoComment;
import com.erepnikov.domain.post.Article;
import com.erepnikov.domain.post.News;
import com.erepnikov.domain.post.Video;
import com.erepnikov.repository.user.AuthorityRepository;
import com.erepnikov.security.AuthoritiesConstants;
import com.erepnikov.service.category.ArticleCategoryService;
import com.erepnikov.service.category.NewsCategoryService;
import com.erepnikov.service.category.VideoCategoryService;
import com.erepnikov.service.comment.ArticleCommentService;
import com.erepnikov.service.comment.NewsCommentService;
import com.erepnikov.service.comment.VideoCommentService;
import com.erepnikov.service.dto.UserDTO;
import com.erepnikov.service.mapper.UserMapper;
import com.erepnikov.service.post.ArticleService;
import com.erepnikov.service.post.NewsService;
import com.erepnikov.service.post.VideoService;
import com.erepnikov.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashSet;

@Component
public class H2Bootstrap implements CommandLineRunner {

    private NewsService newsService;
    private ArticleService articleService;
    private VideoService videoService;
    private UserService userService;
    private NewsCategoryService newsCategoryService;
    private ArticleCategoryService articleCategoryService;
    private VideoCategoryService videoCategoryService;
    private NewsCommentService newsCommentService;
    private ArticleCommentService articleCommentService;
    private VideoCommentService videoCommentService;
    private AuthorityRepository authorityRepository;
    private UserMapper userMapper;
    private String imageInBase64;

    @Autowired
    public H2Bootstrap(
            NewsService newsService,
            ArticleService articleService,
            VideoService videoService,
            UserService userService,
            NewsCategoryService newsCategoryService,
            ArticleCategoryService articleCategoryService,
            VideoCategoryService videoCategoryService,
            AuthorityRepository authorityRepository,
            UserMapper userMapper,
            NewsCommentService newsCommentService,
            ArticleCommentService articleCommentService,
            VideoCommentService videoCommentService
    ) {
        this.newsService = newsService;
        this.articleService = articleService;
        this.videoService = videoService;
        this.userService = userService;
        this.newsCategoryService = newsCategoryService;
        this.articleCategoryService = articleCategoryService;
        this.videoCategoryService = videoCategoryService;
        this.authorityRepository = authorityRepository;
        this.userMapper = userMapper;
        this.newsCommentService = newsCommentService;
        this.articleCommentService = articleCommentService;
        this.videoCommentService = videoCommentService;
        this.setTestImage();
    }

    private void setTestImage() {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            InputStream is = new BufferedInputStream(
                    new FileInputStream(
                            "/Users/egor/Documents/wallpapers/dragon_age_Wallpaper_2560x1600_www.wall321.com.jpg"
                        )
                    );
            int data = 0;
            while ((data = is.read()) != -1){
                baos.write(data);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        this.imageInBase64 = "data:image/jpg;base64," + Base64.getEncoder().encodeToString(baos.toByteArray());
    }

    @Override
    public void run(String... strings) throws Exception {
        UserDTO moderator = new UserDTO();
        moderator.setLogin("moderator");
        moderator.setEmail("moderator@ify.ru");
        this.userService.registerUser(moderator, "password");
        this.userService.getUserWithAuthoritiesByLogin("moderator")
                .ifPresent(res -> {
                            res.setAuthorities(
                                    new HashSet<>(
                                            Arrays.asList(
                                                    this.authorityRepository.findOne(AuthoritiesConstants.USER),
                                                    this.authorityRepository.findOne(AuthoritiesConstants.MODERATOR)
                                            )
                                    )
                            );
                            this.userService.updateUser(this.userMapper.userToUserDTO(res));
                        }
                );

        UserDTO user2 = new UserDTO();
        user2.setLogin("user2");
        user2.setEmail("user2@ify.ru");
        this.userService.registerUser(user2, "password");

        UserDTO admin = new UserDTO();
        admin.setLogin("admin");
        admin.setEmail("admin@ify.ru");
        this.userService.registerUser(admin, "password");
        this.userService.getUserWithAuthoritiesByLogin("admin")
                .ifPresent(res -> {
                        res.setAuthorities(
                                new HashSet<>(
                                        Arrays.asList(
                                                this.authorityRepository.findOne(AuthoritiesConstants.USER),
                                                this.authorityRepository.findOne(AuthoritiesConstants.MODERATOR),
                                                this.authorityRepository.findOne(AuthoritiesConstants.ADMIN)
                                        )
                                )
                        );
                        this.userService.updateUser(this.userMapper.userToUserDTO(res));
                    }
                );

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
            news.setCategory(newsCategory);
            news.setImage(this.imageInBase64);
            news.setUser(this.userService.getUserWithAuthoritiesByLogin("moderator").get());
            this.newsService.save(news);

            Article article = new Article();
            article.setTitle("Test article number" + (i + 1));
            article.setText("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam at consectetur dolor doloribus ducimus, earum expedita harum ipsam, laborum libero mollitia necessitatibus nostrum possimus quo ratione rem veritatis vero voluptatem!");
            article.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            article.setCategory(articleCategory);
            article.setImage(this.imageInBase64);
            article.setUser(this.userService.getUserWithAuthoritiesByLogin("moderator").get());
            this.articleService.save(article);

            Video video = new Video();
            video.setTitle("Test video number" + (i + 1));
            video.setText("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam at consectetur dolor doloribus ducimus, earum expedita harum ipsam, laborum libero mollitia necessitatibus nostrum possimus quo ratione rem veritatis vero voluptatem!");
            video.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            video.setCategory(videoCategory);
            video.setImage(this.imageInBase64);
            video.setVideoUrl("zeCmW6Kyx8o");
            video.setUser(this.userService.getUserWithAuthoritiesByLogin("moderator").get());
            this.videoService.save(video);
        }

        for (int i = 1; i < 16; i++) {
            NewsComment comment1 = new NewsComment();
            comment1.setText("lorem ipsum");
            comment1.setUser(this.userService.getUserWithAuthoritiesByLogin("user2").get());
            comment1.setNews(this.newsService.get(i));
            this.newsCommentService.save(comment1);

            NewsComment comment2 = new NewsComment();
            comment2.setText("lorem ipsum");
            comment2.setUser(this.userService.getUserWithAuthoritiesByLogin("moderator").get());
            comment2.setNews(this.newsService.get(i));
            this.newsCommentService.save(comment2);

            ArticleComment comment3 = new ArticleComment();
            comment3.setText("lorem ipsum");
            comment3.setUser(this.userService.getUserWithAuthoritiesByLogin("user2").get());
            comment3.setArticle(this.articleService.get(i));
            this.articleCommentService.save(comment3);

            ArticleComment comment4 = new ArticleComment();
            comment4.setText("lorem ipsum");
            comment4.setUser(this.userService.getUserWithAuthoritiesByLogin("moderator").get());
            comment4.setArticle(this.articleService.get(i));
            this.articleCommentService.save(comment4);

            VideoComment comment5 = new VideoComment();
            comment5.setText("lorem ipsum");
            comment5.setUser(this.userService.getUserWithAuthoritiesByLogin("user2").get());
            comment5.setVideo(this.videoService.get(i));
            this.videoCommentService.save(comment5);

            VideoComment comment6 = new VideoComment();
            comment6.setText("lorem ipsum");
            comment6.setUser(this.userService.getUserWithAuthoritiesByLogin("moderator").get());
            comment6.setVideo(this.videoService.get(i));
            this.videoCommentService.save(comment6);
        }
    }
}
