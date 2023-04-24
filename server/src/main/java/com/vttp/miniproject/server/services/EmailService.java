package com.vttp.miniproject.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.vttp.miniproject.server.models.User;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;

    public void sendSignupConfirmationEmail(User user) {
        SimpleMailMessage smm = new SimpleMailMessage();
        smm.setFrom("flashcards.vttp@gmail.com");
        smm.setTo(user.getEmail());
        smm.setText(String.format("Dear %s (#%s),\n\nThanks for signing up for an account on FLASHCARDS." +
                    " Log in to your FLASHCARDS account now to begin creating your own study materials.\n\n" 
                    , user.getUsername(), user.getId()));
        smm.setSubject("FLASHCARDS Account Creation Confirmation");

        mailSender.send(smm);

    }
}
