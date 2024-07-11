package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.entities.Subject;
import com.openclassrooms.mddapi.entities.Subscription;
import com.openclassrooms.mddapi.payload.request.SubscriptionRequest;
import com.openclassrooms.mddapi.services.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @GetMapping
    public ResponseEntity<List<Subscription>> getAllSubscriptions() {
        List<Subscription> subscriptions = subscriptionService.getAllSubscriptions();
        return ResponseEntity.ok(subscriptions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subscription> getSubscriptionById(@PathVariable Long id) {
        Subscription subscription = subscriptionService.getSubscriptionById(id);
        if (subscription != null) {
            return ResponseEntity.ok(subscription);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createSubscription(@RequestBody @Valid SubscriptionRequest subscriptionRequest) {
        Long userId = subscriptionRequest.getUserId();
        Long subjectId = subscriptionRequest.getSubjectId();


        boolean isAlreadySubscribed = subscriptionService.isAlreadySubscribed(userId, subjectId);
        if (isAlreadySubscribed) {
            return ResponseEntity.badRequest().body("L'utilisateur est déjà abonné à ce sujet.");
        }

        try {
            Subscription createdSubscription = subscriptionService.createSubscription(subscriptionRequest);
            return ResponseEntity.ok(createdSubscription);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getSubscriptionsByUserId(@PathVariable Long userId) {
        List<Subject> subjects = subscriptionService.getSubscriptionsByUserId(userId);
        if (subjects.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aucun abonnement pour cet Utilisateur");
        } else {
            return ResponseEntity.ok(subjects);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubscription(@PathVariable Long id) {
        try {
            subscriptionService.deleteSubscription(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException ex) {
            return ResponseEntity.notFound().build(); // Retourner 404 si l'entité n'est pas trouvée
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Autres erreurs internes
        }
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteSubscriptionByUserId(@PathVariable Long userId) {
        try {
            subscriptionService.deleteByUserId(userId);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException ex) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/subject/{subjectId}")
    public ResponseEntity<Void> deleteSubscriptionsBySubjectId(@PathVariable Long subjectId) {
        subscriptionService.deleteBySubjectId(subjectId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/user/{userId}/{subjectId}")
    public ResponseEntity<Void> deleteSubscriptionByUserIdAndSubjectId(
            @PathVariable Long userId,
            @PathVariable Long subjectId) {
        subscriptionService.deleteByUserIdAndSubjectId(userId, subjectId);
        return ResponseEntity.noContent().build();
    }
}
