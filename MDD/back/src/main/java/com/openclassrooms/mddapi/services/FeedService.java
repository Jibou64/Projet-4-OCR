package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.entities.Feed;
import com.openclassrooms.mddapi.entities.Post;
import com.openclassrooms.mddapi.entities.Subscription;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.repositories.FeedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FeedService {

    private final FeedRepository feedRepository;
    private final SubscriptionService subscriptionService;
    private final PostService postService;

    @Autowired
    public FeedService(FeedRepository feedRepository, SubscriptionService subscriptionService, PostService postService) {
        this.feedRepository = feedRepository;
        this.subscriptionService = subscriptionService;
        this.postService = postService;
    }

    public List<Feed> getAllFeeds() {
        return feedRepository.findAll();
    }

    public Feed getFeedById(Long id) {
        return feedRepository.findById(id).orElse(null);
    }

    public Feed createFeed(Feed feed) {
        feed.setCreatedAt(LocalDateTime.now());
        return feedRepository.save(feed);
    }

    public void deleteFeed(Long id) {
        feedRepository.deleteById(id);
    }

    public List<Feed> getFeedsByUser(User user) {
        List<Subscription> subscriptions = subscriptionService.getSubscriptionsByUser(user);
        List<Feed> feeds = new ArrayList<>();

        for (Subscription subscription : subscriptions) {
            List<Post> posts = postService.getPostsBySubject(subscription.getSubject());

            for (Post post : posts) {
                Feed feed = new Feed();
                feed.setUser(user);
                feed.setPost(post);
                feeds.add(feed);
            }
        }

        return feeds;
    }
}
