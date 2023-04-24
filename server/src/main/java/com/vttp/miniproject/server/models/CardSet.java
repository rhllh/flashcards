package com.vttp.miniproject.server.models;

import java.util.Date;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class CardSet {
    private int id;
    private String creatorId;
    private String title;
    private String description;
    private Date createdDate;
    private Date lastReview;
    private float lastReviewScore;
    private boolean isPublic;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getCreatorId() {
        return creatorId;
    }
    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Date getCreatedDate() {
        return createdDate;
    }
    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
    public Date getLastReview() {
        return lastReview;
    }
    public void setLastReview(Date lastReview) {
        this.lastReview = lastReview;
    }
    public float getLastReviewScore() {
        return lastReviewScore;
    }
    public void setLastReviewScore(float lastReviewScore) {
        this.lastReviewScore = lastReviewScore;
    }
    public boolean isPublic() {
        return isPublic;
    }
    public void setPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }
    
    public static CardSet create(SqlRowSet rs) {
        CardSet cs = new CardSet();
        cs.setId(rs.getInt("id"));
        cs.setCreatorId(rs.getString("creator_id"));
        cs.setTitle(rs.getString("title"));
        cs.setDescription(rs.getString("description"));
        cs.setCreatedDate(rs.getDate("created_date"));
        cs.setLastReview(rs.getDate("last_review"));
        cs.setLastReviewScore(rs.getFloat("last_review_score"));

        return cs;
    }

    public JsonObject toJSON() {
        return Json.createObjectBuilder()
                        .add("id", getId())
                        .add("creatorId", getCreatorId())
                        .add("title", getTitle())
                        .add("description", getDescription())
                        .add("createdDate", getCreatedDate().toString())
                        .add("lastReview", getLastReview() == null ? "" : getLastReview().toString())
                        .add("lastReviewScore", getLastReviewScore())
                        .build();
        
    }

    
}
