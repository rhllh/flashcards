package com.vttp.miniproject.server.repositories;

public class Queries {

    public static final String GET_ALL_SETS = "select * from card_set where creator_id = ?";

    public static final String GET_SET_BY_SET_ID = "select * from card_set where id = ?";
    
    public static final String CREATE_CARD_SET = "insert into card_set(creator_id, title, description, created_date) values(?, ?, ?, ?)";

    public static final String UPDATE_CARD_SET = "update card_set set creator_id = ?, title = ?, description = ?, created_date = ? where id = ?";

    public static final String UPDATE_REVIEW_SCORE_OF_SET = "update card_set set last_review = ?, last_review_score = ? where id = ?";

    public static final String DELETE_CARD_SET = "delete from card_set where id = ?";

    public static final String GET_CARDS_BY_SETID = "select * from card where set_id = ? ";

    public static final String CREATE_CARD_BY_SETID = "insert into card(set_id, presented, hidden, image_file, created_date) values(?, ?, ?, ?, ?)";

    public static final String UPDATE_CARD_BY_ID = "update card set presented = ?, hidden = ?, image_file = ?, updated_date = ? where id = ?";

    public static final String DELETE_CARD_BY_ID = "delete from card where id = ?";

    public static final String DELETE_CARDS_BY_SET_ID = "delete from card where set_id = ?";
}
