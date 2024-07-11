package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.entities.Subscription;
import com.openclassrooms.mddapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByUser(User user);
    List<Subscription> findByUserId(Long userId);
    List<Subscription> findByUserIdAndSubjectId(Long userId, Long subjectId);
    void deleteByUserId(Long userId);


    @Transactional
    void deleteBySubjectId(Long subjectId);

    @Transactional
    void deleteByUserIdAndSubjectId(Long userId, Long subjectId);
}
