package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.entities.Post;
import com.openclassrooms.mddapi.entities.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findBySubject(Subject subject);

    Optional<Post> findById(Long id);

}
