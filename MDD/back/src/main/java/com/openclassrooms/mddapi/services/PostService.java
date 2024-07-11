package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.entities.Comment;
import com.openclassrooms.mddapi.entities.Post;
import com.openclassrooms.mddapi.entities.Subject;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.payload.response.PostFullResponse;
import com.openclassrooms.mddapi.repositories.CommentRepository;
import com.openclassrooms.mddapi.repositories.PostRepository;
import com.openclassrooms.mddapi.repositories.SubjectRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

        public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + id));
    }

    public Post createPost(Post post) {
        // You can add additional logic here to handle creation
        return postRepository.save(post);
    }

    public Post updatePost(Long id, Post updatedPost) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + id));

        User user = userRepository.findById(updatedPost.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + updatedPost.getUser().getId()));
        Subject subject = subjectRepository.findById(updatedPost.getSubject().getId())
                .orElseThrow(() -> new RuntimeException("Subject not found with id " + updatedPost.getSubject().getId()));

        post.setUser(user)
                .setSubject(subject)
                .setTitle(updatedPost.getTitle())
                .setContent(updatedPost.getContent());

        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + id));

        postRepository.delete(post);
    }
    public List<Post> getPostsBySubject(Subject subject) {
        return postRepository.findBySubject(subject);
    }

    public PostFullResponse getPostFullResponse(Long postId) {
        Optional<Post> post  = postRepository.findById(postId);

        return null;
    }



}
