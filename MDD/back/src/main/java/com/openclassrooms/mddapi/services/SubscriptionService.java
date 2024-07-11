package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.entities.Subject;
import com.openclassrooms.mddapi.entities.Subscription;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.payload.request.SubscriptionRequest;
import com.openclassrooms.mddapi.repositories.SubjectRepository;
import com.openclassrooms.mddapi.repositories.SubscriptionRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final SubjectRepository subjectRepository;

    @Autowired
    public SubscriptionService(SubscriptionRepository subscriptionRepository,
                               UserRepository userRepository,
                               SubjectRepository subjectRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.subjectRepository = subjectRepository;
    }

    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    public Subscription getSubscriptionById(Long id) {
        return subscriptionRepository.findById(id)
                .orElse(null);
    }

    public Subscription createSubscription(SubscriptionRequest subscriptionRequest) {
        Subscription subscription = new Subscription();

        User user = userRepository.findById(subscriptionRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + subscriptionRequest.getUserId()));
        Subject subject = subjectRepository.findById(subscriptionRequest.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found with id " + subscriptionRequest.getSubjectId()));

        subscription.setUser(user);
        subscription.setSubject(subject);

        return subscriptionRepository.save(subscription);
    }

    public boolean isAlreadySubscribed(Long userId, Long subjectId) {
        List<Subscription> existingSubscriptions = subscriptionRepository.findByUserIdAndSubjectId(userId, subjectId);
        return !existingSubscriptions.isEmpty();
    }
    public void deleteSubscription(Long id) {
        subscriptionRepository.deleteById(id);
    }
    public List<Subscription> getSubscriptionsByUser(User user) {
        return subscriptionRepository.findByUser(user);

    }
    public List<Subject> getSubscriptionsByUserId(Long userId) {
        List<Subscription> subscriptions = subscriptionRepository.findByUserId(userId);
        return subscriptions.stream()
                .map(Subscription::getSubject)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteByUserId(Long userId) {
        subscriptionRepository.deleteByUserId(userId);
    }

    @Transactional
    public void deleteBySubjectId(Long subjectId) {
        subscriptionRepository.deleteBySubjectId(subjectId);
    }

    @Transactional
    public void deleteByUserIdAndSubjectId(Long userId, Long subjectId) {
        subscriptionRepository.deleteByUserIdAndSubjectId(userId, subjectId);
    }
}
