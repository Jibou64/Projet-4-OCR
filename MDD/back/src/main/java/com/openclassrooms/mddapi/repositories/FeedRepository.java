package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.entities.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {
}
