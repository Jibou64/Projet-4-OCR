package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.entities.Comment;
import com.openclassrooms.mddapi.payload.request.CommentRequest;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addComment(@RequestBody CommentRequest commentRequest) {
        commentService.addComment(commentRequest);

        // Préparez la réponse JSON
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Comment added successfully");
        response.put("status", HttpStatus.CREATED.value());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable Long postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Comment deleted successfully");
        response.put("status", HttpStatus.OK.value());

        return ResponseEntity.ok(response);
    }


}
