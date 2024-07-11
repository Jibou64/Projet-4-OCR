package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.entities.Post;
import com.openclassrooms.mddapi.entities.Subject;
import com.openclassrooms.mddapi.payload.request.SubjectRequest;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.repositories.PostRepository;
import com.openclassrooms.mddapi.repositories.SubjectRepository;
import com.openclassrooms.mddapi.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    @Autowired
    SubjectRepository subjectRepository;

    @Autowired
    SubjectService subjectService;

    @Autowired
    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @PostMapping
    public ResponseEntity<?> createSubject(@Valid @RequestBody SubjectRequest subjectRequest) {
        Subject subject = new Subject()
                .setName(subjectRequest.getName())
                .setDescription(subjectRequest.getDescription());
        subjectRepository.save(subject);

        return ResponseEntity.ok(new MessageResponse("Subject created successfully!"));
    }

    @GetMapping
    public ResponseEntity<List<Subject>> getAllSubjects() {
        List<Subject> subjects = subjectRepository.findAll();
        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subject> getSubjectById(@PathVariable Long id) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found with id " + id));
        return ResponseEntity.ok(subject);
    }
    @GetMapping("/{subjectId}/posts")
    public ResponseEntity<List<Post>> getPostsBySubject(@PathVariable Long subjectId) {
        List<Post> posts = subjectService.getPostsBySubjectId(subjectId);
        return ResponseEntity.ok(posts);
    }
}
