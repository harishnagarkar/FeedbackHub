package com.feedbackhub.backend.service;

import com.feedbackhub.backend.dto.DashboardStats;
import com.feedbackhub.backend.dto.FeedbackRequest;
import com.feedbackhub.backend.enums.Status;
import com.feedbackhub.backend.model.Feedback;
import com.feedbackhub.backend.model.Project;
import com.feedbackhub.backend.repository.FeedbackRepository;
import com.feedbackhub.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final ProjectRepository projectRepository;

    public Feedback submitFeedback(FeedbackRequest request) {
        Project project = projectRepository.findByApiKey(request.getApiKey())
                .orElseThrow(() -> new RuntimeException("Invalid API Key provided"));

        Feedback feedback = Feedback.builder()
                .project(project)
                .message(request.getMessage())
                .userEmail(request.getUserEmail())
                .category(request.getCategory())
                .priority(request.getPriority())
                .status(Status.OPEN)
                .build();

        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getFeedbackByProject(Long projectId) {
        return feedbackRepository.findByProjectId(projectId);
    }

    public Feedback updateStatus(Long feedbackId, Status status) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new RuntimeException("Feedback ticket not found"));
        feedback.setStatus(status);
        return feedbackRepository.save(feedback);
    }

    public DashboardStats getProjectStats(Long projectId) {
        long total = feedbackRepository.countByProjectId(projectId);
        long open = feedbackRepository.countByProjectIdAndStatus(projectId, Status.OPEN);
        long inProgress = feedbackRepository.countByProjectIdAndStatus(projectId, Status.IN_PROGRESS);
        long resolved = feedbackRepository.countByProjectIdAndStatus(projectId, Status.RESOLVED);

        return DashboardStats.builder()
                .totalFeedback(total)
                .openTickets(open)
                .inProgressTickets(inProgress)
                .resolvedTickets(resolved)
                .build();
    }
}