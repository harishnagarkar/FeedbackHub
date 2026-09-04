package com.feedbackhub.backend.dto;

import com.feedbackhub.backend.enums.Category;
import com.feedbackhub.backend.enums.Priority;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackRequest {
    private String apiKey;
    private String message;
    private String userEmail;
    private Category category;
    private Priority priority;
}