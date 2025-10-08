package com.fashionassistant.services;

public interface EmailService {
    void sendVerificationEmail(String to, String subject, String body);
}
