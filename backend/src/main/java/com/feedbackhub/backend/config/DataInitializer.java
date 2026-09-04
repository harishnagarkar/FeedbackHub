package com.feedbackhub.backend.config;

import com.feedbackhub.backend.enums.Category;
import com.feedbackhub.backend.enums.Priority;
import com.feedbackhub.backend.enums.Status;
import com.feedbackhub.backend.model.Feedback;
import com.feedbackhub.backend.model.Project;
import com.feedbackhub.backend.repository.FeedbackRepository;
import com.feedbackhub.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ProjectRepository projectRepository;
    private final FeedbackRepository feedbackRepository;

    @Override
    public void run(String... args) throws Exception {
        if (projectRepository.count() == 0) {
            Project demoApp = Project.builder()
                    .name("SaaS Metrics App")
                    .apiKey("fh_live_demo123456")
                    .websiteUrl("https://demo-saas.com")
                    .build();

            Project ecomApp = Project.builder()
                    .name("ShopSwift E-Commerce")
                    .apiKey("fh_live_shop789012")
                    .websiteUrl("https://shopswift.io")
                    .build();

            projectRepository.saveAll(List.of(demoApp, ecomApp));

            Feedback f1 = Feedback.builder()
                    .project(demoApp)
                    .message("The checkout page crashes when entering non-ASCII characters in address line 2.")
                    .userEmail("dev@client.com")
                    .category(Category.BUG)
                    .priority(Priority.HIGH)
                    .status(Status.OPEN)
                    .build();

            Feedback f2 = Feedback.builder()
                    .project(demoApp)
                    .message("Please add Dark Mode support to the analytics dashboard!")
                    .userEmail("user@design.org")
                    .category(Category.FEATURE_REQUEST)
                    .priority(Priority.MEDIUM)
                    .status(Status.IN_PROGRESS)
                    .build();

            Feedback f3 = Feedback.builder()
                    .project(demoApp)
                    .message("Love the ultra-fast load times on version 2.0 release! Great work.")
                    .userEmail("fan@techcorp.io")
                    .category(Category.PRAISE)
                    .priority(Priority.LOW)
                    .status(Status.RESOLVED)
                    .build();

            Feedback f4 = Feedback.builder()
                    .project(ecomApp)
                    .message("Payment gateway timeout occurring on PayPal checkout redirect.")
                    .userEmail("support@shopswift.io")
                    .category(Category.BUG)
                    .priority(Priority.HIGH)
                    .status(Status.OPEN)
                    .build();

            feedbackRepository.saveAll(List.of(f1, f2, f3, f4));

            System.out.println(">>> DataInitializer: Sample projects and feedback tickets created successfully!");
        }
    }
}