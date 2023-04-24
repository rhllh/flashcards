package com.vttp.miniproject.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.vttp.miniproject.server.models.User;
import com.vttp.miniproject.server.services.EmailService;
import com.vttp.miniproject.server.services.NotificationService;
import com.vttp.miniproject.server.services.UserService;

import jakarta.json.Json;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin()
public class AuthController {

    @Autowired
    private UserService userSvc;

    @Autowired
    private EmailService emailSvc;

    @Autowired
    private NotificationService notifSvc;

    @PostMapping("/validate")
    @ResponseBody
    public ResponseEntity<String> validateUser(@RequestBody User user) {
        boolean validated = userSvc.validateUser(user);

        if (validated) {
            user = userSvc.getUser(user);
        } else {
            notifSvc.postNotification("You have entered invalid login credentials");
            return ResponseEntity.status(400)
                    .body(Json.createObjectBuilder()
                        .add("isValidated", validated).build().toString());
        }

        notifSvc.postNotification("You have successfully logged in as %s".formatted(user.getUsername()));

        return ResponseEntity.ok(Json.createObjectBuilder()
                    .add("isValidated", validated)
                    .add("id", user.getId())
                    .build().toString());
    }

    // POST - create new user
    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity<String> createUser(@RequestBody User user) {
        boolean isCreated = userSvc.createUser(user);

        if (!isCreated) {
            notifSvc.postNotification("There was a problem creating an account. Please try again.");

            return ResponseEntity.badRequest()
                    .body(Json.createObjectBuilder()
                            .add("isCreated", isCreated).build().toString()); 
        }

        emailSvc.sendSignupConfirmationEmail(user);

        notifSvc.postNotification("You have successfully created an account. Please log in.");

        return ResponseEntity.status(201).body(Json.createObjectBuilder()
                            .add("isCreated", isCreated).build().toString());
    }
}
