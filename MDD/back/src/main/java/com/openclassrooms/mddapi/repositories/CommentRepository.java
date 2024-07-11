package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.entities.Comment;
import com.openclassrooms.mddapi.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
}
