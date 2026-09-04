package com.feedbackhub.backend.service;

import com.feedbackhub.backend.dto.ProjectRequest;
import com.feedbackhub.backend.model.Project;
import com.feedbackhub.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public Project createProject(ProjectRequest request) {
        Project project = Project.builder()
                .name(request.getName())
                .websiteUrl(request.getWebsiteUrl())
                .apiKey("fh_live_" + UUID.randomUUID().toString().substring(0, 12))
                .build();
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with ID: " + id));
    }
}