package com.maitri;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MaitriApplication {

    public static void main(String[] args) {
        System.out.println("🚀 Starting Maitri - Women's Health & Wellness Platform Backend...");
        SpringApplication.run(MaitriApplication.class, args);
        System.out.println("✅ Maitri Backend is running successfully!");
        System.out.println("📍 API Base URL: http://localhost:8080");
        System.out.println("🔐 Auth Endpoints:");
        System.out.println("   - POST http://localhost:8080/api/auth/register");
        System.out.println("   - POST http://localhost:8080/api/auth/login");
        System.out.println("   - GET  http://localhost:8080/api/auth/health");
    }
}
