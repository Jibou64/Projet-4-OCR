package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.entities.Feed;
import com.openclassrooms.mddapi.entities.Post;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.payload.request.FeedRequest;
import com.openclassrooms.mddapi.services.FeedService;
import com.openclassrooms.mddapi.services.UserService; // Assurez-vous d'importer le service UserService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feeds")
public class FeedController {

    private final FeedService feedService;
    private final UserService userService; // Injectez le service UserService

    @Autowired
    public FeedController(FeedService feedService, UserService userService) {
        this.feedService = feedService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<Feed>> getAllFeeds() {
        List<Feed> feeds = feedService.getAllFeeds();
        return ResponseEntity.ok(feeds);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feed> getFeedById(@PathVariable Long id) {
        Feed feed = feedService.getFeedById(id);
        if (feed != null) {
            return ResponseEntity.ok(feed);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Feed> createFeed(@RequestBody FeedRequest feedRequest) {
        try {
            Feed feed = new Feed();

            // Récupérer et vérifier l'utilisateur par ID
            User user = userService.getUserById(feedRequest.getUserId());
            if (user == null) {
                return ResponseEntity.badRequest().build();
            }
            feed.setUser(user);

            // Récupérer et vérifier le post par ID
            Post post = new Post();
            post.setId(feedRequest.getPostId());
            feed.setPost(post);

            Feed createdFeed = feedService.createFeed(feed);
            return ResponseEntity.ok(createdFeed);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeed(@PathVariable Long id) {
        feedService.deleteFeed(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Feed>> getFeedsByUser(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        List<Feed> feeds = feedService.getFeedsByUser(user);
        return ResponseEntity.ok(feeds);
    }
}
