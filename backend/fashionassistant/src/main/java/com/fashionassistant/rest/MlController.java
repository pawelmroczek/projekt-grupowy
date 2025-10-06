package com.fashionassistant.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("fashion/ml")
public class MlController {

    // Wczytujemy adres serwera Pythona z ENV lub domyślnie z Compose'a
    @Value("${PYTHON_ML_URL:http://python-ml:8000}")
    private String pythonMlUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/predict")
    public ResponseEntity<String> predict(@RequestParam("file") MultipartFile file) throws IOException {
        String url = pythonMlUrl + "/predict";

        // ustawiamy nagłówki
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // przygotowujemy ciało żądania
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        });

        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);

        // wysyłamy obraz do modelu w Pythonie
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }

    @GetMapping("/test")
    public String test() {
        return "ML Controller działa!";
    }
}
