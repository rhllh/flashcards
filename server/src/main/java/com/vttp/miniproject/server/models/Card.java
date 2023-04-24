package com.vttp.miniproject.server.models;

import java.util.Date;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Card {
    private int id;
    private int setId;
    private String presented;
    private String hidden;
    private String imageFile;
    private Date createdDate;
    private Date updatedDate;
    
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getSetId() {
        return setId;
    }
    public void setSetId(int setId) {
        this.setId = setId;
    }
    public String getPresented() {
        return presented;
    }
    public void setPresented(String presented) {
        this.presented = presented;
    }
    public String getHidden() {
        return hidden;
    }
    public void setHidden(String hidden) {
        this.hidden = hidden;
    }
    public String getImageFile() {
        return imageFile;
    }
    public void setImageFile(String imageFile) {
        this.imageFile = imageFile;
    }
    public Date getCreatedDate() {
        return createdDate;
    }
    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
    public Date getUpdatedDate() {
        return updatedDate;
    }
    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

    public static Card create(SqlRowSet rs) {
        Card c = new Card();
        c.setId(rs.getInt("id"));
        c.setSetId(rs.getInt("set_id"));
        c.setPresented(rs.getString("presented"));
        c.setHidden(rs.getString("hidden"));
        c.setImageFile(rs.getString("image_file") == null ? "nil" : rs.getString("image_file"));

        return c;
    }

    public JsonObject toJSON() {
        return Json.createObjectBuilder()
                .add("id", getId())
                .add("setId", getSetId())
                .add("presented", getPresented())
                .add("hidden", getHidden())
                .add("imageFile", getImageFile())
                .build();
    }
    
}
