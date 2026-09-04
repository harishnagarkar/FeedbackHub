package com.feedbackhub.backend.repository;

import com.feedbackhub.backend.enums.Status;
import com.feedbackhub.backend.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    // Fetch all feedback for a specific project
    List<Feedback> findByProjectId(Long projectId);

    // Fetch feedback filtered by project and ticket status (OPEN, RESOLVED, etc.)
    List<Feedback> findByProjectIdAndStatus(Long projectId, Status status);

    // Count queries for dashboard analytics
    long countByProjectId(Long projectId);
    long countByProjectIdAndStatus(Long projectId, Status status);
}