package com.vttp.miniproject.server.repositories;

public class QueriesUser {
    
    public static final String CREATE_NEW_USER = "insert into user(id, username, password, email, created_date) values(?, ?, ?, ?, ?)";

    public static final String CHECK_EXISTING_USER = "select count(*) > 0 as existing from user where username = ? or email = ?";

    public static final String VALIDATE_USER = "select count(*) > 0 as valid_cred from user where username = ? and password = ?";

    public static final String GET_USER = "select * from user where username = ? and password = ?";
}
