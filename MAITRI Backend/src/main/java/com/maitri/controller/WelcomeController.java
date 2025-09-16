package com.maitri.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeController {

    @GetMapping("/")
    public Map<String, Object> welcome() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to Maitri API Server");
        response.put("status", "running");
        response.put("timestamp", System.currentTimeMillis());
        response.put("version", "1.0.0");
        response.put("endpoints", Map.of(
            "health", "/api/auth/health",
            "login", "/api/auth/login",
            "register", "/api/auth/register",
            "checkEmail", "/api/auth/check-email"
        ));
        return response;
    }

    @GetMapping("/api")
    public Map<String, Object> apiInfo() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Maitri API");
        response.put("version", "1.0.0");
        response.put("status", "active");
        response.put("availableEndpoints", Map.of(
            "auth", "/api/auth/*"
        ));
        return response;
    }

    @GetMapping("/api/welcome")
    public String apiWelcome() {
        return "Welcome to Maitri API! Server is running successfully.";
    }
}
