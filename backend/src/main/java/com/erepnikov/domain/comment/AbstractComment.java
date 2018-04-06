package com.erepnikov.domain.comment;

import com.erepnikov.domain.User;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@MappedSuperclass
public abstract class AbstractComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "text")
    @Type(type = "text")
    private String text;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
