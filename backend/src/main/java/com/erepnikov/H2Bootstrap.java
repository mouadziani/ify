package com.erepnikov;

import com.erepnikov.domain.category.ArticleCategory;
import com.erepnikov.domain.category.BlogCategory;
import com.erepnikov.domain.category.NewsCategory;
import com.erepnikov.domain.category.VideoCategory;
import com.erepnikov.domain.comment.Comment;
import com.erepnikov.domain.comment.CommentDiscriminators;
import com.erepnikov.domain.post.Article;
import com.erepnikov.domain.post.Blog;
import com.erepnikov.domain.post.News;
import com.erepnikov.domain.post.Video;
import com.erepnikov.repository.user.AuthorityRepository;
import com.erepnikov.security.AuthoritiesConstants;
import com.erepnikov.service.category.ArticleCategoryService;
import com.erepnikov.service.category.BlogCategoryService;
import com.erepnikov.service.category.NewsCategoryService;
import com.erepnikov.service.category.VideoCategoryService;
import com.erepnikov.service.comment.CommentService;
import com.erepnikov.service.dto.UserDTO;
import com.erepnikov.service.mapper.UserMapper;
import com.erepnikov.service.post.ArticleService;
import com.erepnikov.service.post.BlogService;
import com.erepnikov.service.post.NewsService;
import com.erepnikov.service.post.VideoService;
import com.erepnikov.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.*;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashSet;

@Component
public class H2Bootstrap implements CommandLineRunner {

    private NewsService newsService;
    private ArticleService articleService;
    private VideoService videoService;
    private BlogService blogService;
    private UserService userService;
    private BlogCategoryService blogCategoryService;
    private NewsCategoryService newsCategoryService;
    private ArticleCategoryService articleCategoryService;
    private VideoCategoryService videoCategoryService;
    private CommentService commentService;
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
            CommentService commentService,
            BlogCategoryService blogCategoryService,
            BlogService blogService
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
        this.commentService = commentService;
        this.blogCategoryService = blogCategoryService;
        this.blogService = blogService;
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
        this.createUsers();
        this.createPostsAndCategories();
        this.createComments();
    }

    private void createUsers() {
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
    }

    private void createPostsAndCategories() {
        NewsCategory newsCategory = new NewsCategory();
        newsCategory.setName("News Category");
        this.newsCategoryService.save(newsCategory);

        ArticleCategory articleCategory = new ArticleCategory();
        articleCategory.setName("Article Category");
        this.articleCategoryService.save(articleCategory);

        VideoCategory videoCategory = new VideoCategory();
        videoCategory.setName("Video Category");
        this.videoCategoryService.save(videoCategory);

        BlogCategory blogCategory = new BlogCategory();
        blogCategory.setName("Blog category");
        this.blogCategoryService.save(blogCategory);

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

            Blog blog = new Blog();
            blog.setTitle("Test article number " + (i + 1));
            blog.setText("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam at consectetur dolor doloribus ducimus, earum expedita harum ipsam, laborum libero mollitia necessitatibus nostrum possimus quo ratione rem veritatis vero voluptatem!");
            blog.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            blog.setCategory(blogCategory);
            blog.setImage(this.imageInBase64);
            blog.setUser(this.userService.getUserWithAuthoritiesByLogin("user2").get());
            this.blogService.save(blog);
        }
    }

    private void createComments() {
        for (int i = 1; i < 16; i++) {
            Comment comment1 = new Comment();
            comment1.setText("lorem ipsum");
            comment1.setUser(this.userService.getUserWithAuthoritiesByLogin("user2").get());
            comment1.setPostId(i);
            comment1.setType(CommentDiscriminators.NEWS_DISCRIMINATOR);
            comment1.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            this.commentService.save(comment1);

            Comment comment2 = new Comment();
            comment2.setText("lorem ipsum");
            comment2.setUser(this.userService.getUserWithAuthoritiesByLogin("moderator").get());
            comment2.setPostId(i);
            comment2.setType(CommentDiscriminators.NEWS_DISCRIMINATOR);
            comment2.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            this.commentService.save(comment2);

            Comment comment3 = new Comment();
            comment3.setText("lorem ipsum");
            comment3.setUser(this.userService.getUserWithAuthoritiesByLogin("user2").get());
            comment3.setPostId(i);
            comment3.setType(CommentDiscriminators.ARTICLE_DISCRIMINATOR);
            comment3.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            this.commentService.save(comment3);

            Comment comment4 = new Comment();
            comment4.setText("lorem ipsum");
            comment4.setUser(this.userService.getUserWithAuthoritiesByLogin("moderator").get());
            comment4.setPostId(i);
            comment4.setType(CommentDiscriminators.ARTICLE_DISCRIMINATOR);
            comment4.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            this.commentService.save(comment4);

            Comment comment5 = new Comment();
            comment5.setText("lorem ipsum");
            comment5.setUser(this.userService.getUserWithAuthoritiesByLogin("user2").get());
            comment5.setPostId(i);
            comment5.setType(CommentDiscriminators.VIDEO_DISCRIMINATOR);
            comment5.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            this.commentService.save(comment5);

            Comment comment6 = new Comment();
            comment6.setText("lorem ipsum");
            comment6.setUser(this.userService.getUserWithAuthoritiesByLogin("moderator").get());
            comment6.setPostId(i);
            comment6.setType(CommentDiscriminators.VIDEO_DISCRIMINATOR);
            comment6.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            this.commentService.save(comment6);

            Comment comment7 = new Comment();
            comment7.setText("lorem ipsum");
            comment7.setUser(this.userService.getUserWithAuthoritiesByLogin("user2").get());
            comment7.setPostId(i);
            comment7.setType(CommentDiscriminators.BLOG_DISCRIMINATOR);
            comment7.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            this.commentService.save(comment7);

            Comment comment8 = new Comment();
            comment8.setText("lorem ipsum");
            comment8.setUser(this.userService.getUserWithAuthoritiesByLogin("moderator").get());
            comment8.setPostId(i);
            comment8.setType(CommentDiscriminators.BLOG_DISCRIMINATOR);
            comment8.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            this.commentService.save(comment8);
        }
    }
}
