package com.openclassrooms.mddapi.entities;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false) // Foreign key reference to User table
    private User user;

    @ManyToOne(fetch = FetchType.LAZY) // ManyToOne relation to Post
    @JoinColumn(name = "post_id", nullable = false) // Foreign key reference to Post table
    private Post post;

    @Column( nullable = false)
    private String content;

    @Column(name = "created_at", nullable = false) // createdAt column with not null constraint
    private LocalDateTime createdAt;

}
