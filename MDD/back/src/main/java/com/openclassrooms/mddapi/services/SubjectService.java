package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.entities.Post;
import com.openclassrooms.mddapi.entities.Subject;
import com.openclassrooms.mddapi.repositories.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {
    private final SubjectRepository subjectRepository;

    @Autowired
    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public List<Post> getPostsBySubjectId(Long subjectId) {
        Subject subject = subjectRepository.findById(subjectId).orElseThrow(() -> new RuntimeException("Subject not found"));
        return subject.getPosts();
    }
}
