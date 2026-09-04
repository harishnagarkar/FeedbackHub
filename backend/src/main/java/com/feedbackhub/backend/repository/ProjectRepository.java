package com.feedbackhub.backend.repository;

import com.feedbackhub.backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    // Find a project by its unique API key (used when embed widget sends feedback)
    Optional<Project> findByApiKey(String apiKey);
}