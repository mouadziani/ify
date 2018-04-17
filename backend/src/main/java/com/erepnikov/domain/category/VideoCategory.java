package com.erepnikov.domain.category;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "video_category")
public class VideoCategory extends AbstractCategory {

    private static final long serialVersionUID = 1L;
}
