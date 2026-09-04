package com.feedbackhub.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class DashboardStats {
    private long totalFeedback;
    private long openTickets;
    private long inProgressTickets;
    private long resolvedTickets;
}