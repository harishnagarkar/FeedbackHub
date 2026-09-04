package com.feedbackhub.backend.controller;

import com.feedbackhub.backend.dto.DashboardStats;
import com.feedbackhub.backend.dto.FeedbackRequest;
import com.feedbackhub.backend.enums.Status;
import com.feedbackhub.backend.model.Feedback;
import com.feedbackhub.backend.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FeedbackController {

    private final FeedbackService feedbackService;

    // Public endpoint hit by the client-side embed widget
    @PostMapping("/submit")
    public ResponseEntity<Feedback> submitFeedback(@RequestBody FeedbackRequest request) {
        return new ResponseEntity<>(feedbackService.submitFeedback(request), HttpStatus.CREATED);
    }

    // Dashboard endpoint: Fetch tickets for a project
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Feedback>> getFeedbackByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(feedbackService.getFeedbackByProject(projectId));
    }

    // Dashboard endpoint: Update ticket status
    @PatchMapping("/{id}/status")
    public ResponseEntity<Feedback> updateStatus(
            @PathVariable Long id,
            @RequestParam Status status) {
        return ResponseEntity.ok(feedbackService.updateStatus(id, status));
    }

    // Dashboard endpoint: Get stats breakdown
    @GetMapping("/project/{projectId}/stats")
    public ResponseEntity<DashboardStats> getProjectStats(@PathVariable Long projectId) {
        return ResponseEntity.ok(feedbackService.getProjectStats(projectId));
    }
}