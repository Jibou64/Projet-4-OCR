package com.openclassrooms.mddapi.payload.request;

import java.util.Date;

public class CommentRequest {
    private Long userId;
    private Long postId;
    private String content;
    private Date createdAt;

    // Getters
    public Long getUserId() {
        return userId;
    }

    public Long getPostId() {
        return postId;
    }

    public String getContent() {
        return content;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    // Setters
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
