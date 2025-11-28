package com.fashionassistant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class FashionassistantApplication {

    public static void main(String[] args) {
        SpringApplication.run(FashionassistantApplication.class, args);
    }

}
