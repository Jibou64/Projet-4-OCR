package com.openclassrooms.mddapi.payload.request;

public class FeedRequest {

    private Long userId;
    private Long postId;

    // Constructeurs, getters et setters

    public FeedRequest() {
    }

    public FeedRequest(Long userId, Long postId) {
        this.userId = userId;
        this.postId = postId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }
}
