package com.erepnikov.domain;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "video_category")
public class VideoCategory extends AbstractCategory implements Serializable {

    private static final long serialVersionUID = 1L;
}
