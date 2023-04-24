package com.vttp.miniproject.server.services;

import java.security.MessageDigest;
import java.util.HexFormat;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vttp.miniproject.server.models.User;
import com.vttp.miniproject.server.repositories.UserRepo;

@Service
public class UserService {
    
    @Autowired
    private UserRepo userRepo;

    public boolean validateUser(User user) {
        String hash = "";
        try {
            MessageDigest md5 = MessageDigest.getInstance("SHA-1");
            md5.update(user.getPassword().getBytes());
            byte[] h = md5.digest();
            hash = HexFormat.of().formatHex(h);

            user.setPassword(hash);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return userRepo.validateUser(user) > 0;
    }

    public User getUser(User user) {
        return userRepo.getUser(user);
    }

    public boolean createUser(User user) {
        user.setId(UUID.randomUUID().toString().substring(0, 8));

        String hash = "";
        try {
            MessageDigest md5 = MessageDigest.getInstance("SHA-1");
            md5.update(user.getPassword().getBytes());
            byte[] h = md5.digest();
            hash = HexFormat.of().formatHex(h);

            user.setPassword(hash);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return userRepo.createUser(user);
    }
}
