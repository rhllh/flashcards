package com.vttp.miniproject.server.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@Service
public class NotificationService {

    private final String BASE_URL = "https://fcm.googleapis.com/fcm/send";
    
    @Value("${NOTIFICATION_SERVICE_AUTHKEY}")
    private String authKey;
    
    @Value("${NOTIFICATION_SERVICE_SERVERKEY}")
    private String serverKey;

    public void postNotification(String message) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", MediaType.APPLICATION_JSON_VALUE);
        headers.add("Authorization", "key=" + authKey);

        JsonObject body = Json.createObjectBuilder()
                            .add("notification", Json.createObjectBuilder()
                                                .add("title", "Notification")
                                                .add("message", message).build())
                            .add("to", serverKey).build();

        HttpEntity request = new HttpEntity<>(body.toString(), headers);

        ResponseEntity<String> resp = restTemplate.exchange(BASE_URL, HttpMethod.POST, request, String.class, 1);

        System.out.println(resp);
        System.out.println();
    }
}
