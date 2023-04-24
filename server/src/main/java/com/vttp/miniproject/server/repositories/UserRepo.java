package com.vttp.miniproject.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.vttp.miniproject.server.models.User;

import static com.vttp.miniproject.server.repositories.QueriesUser.*;

import java.util.Date;

@Repository
public class UserRepo {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Integer validateUser(User user) {
        return jdbcTemplate.queryForObject(VALIDATE_USER, 
                Integer.class, new Object[] { user.getUsername(), user.getPassword() });
    }

    public User getUser(User user) {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(GET_USER, user.getUsername(), user.getPassword());

        while (rs.next()) {
            user.setId(rs.getString("id"));
            user.setEmail(rs.getString("email"));
        }

        return user;
    }

    public boolean createUser(User user) {
        // check if user exists
        Integer exists = jdbcTemplate.queryForObject(CHECK_EXISTING_USER, 
                Integer.class, new Object[] { user.getUsername(), user.getEmail() });

        if (exists > 0) {
            return false;
        }

        return jdbcTemplate.update(CREATE_NEW_USER, user.getId(), 
            user.getUsername(), user.getPassword(), user.getEmail(), new Date()) > 0;
    }
}
