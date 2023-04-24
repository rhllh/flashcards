package com.vttp.miniproject.server.controllers;

import java.io.StringReader;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.vttp.miniproject.server.exceptions.CardSetException;
import com.vttp.miniproject.server.models.CardSet;
import com.vttp.miniproject.server.services.CardService;
import com.vttp.miniproject.server.services.SetService;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;

@RestController
@RequestMapping("/api/set")
@CrossOrigin()
public class SetController {

    @Autowired
    private SetService setSvc;

    @Autowired
    private CardService cardSvc;

    // GET - all sets
    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<String> getAllSets(@RequestParam String creatorId) {

        Optional<JsonArray> allSets = setSvc.getAllSets(creatorId);

        if (allSets.isEmpty()) {
            return ResponseEntity.ok(Json.createArrayBuilder().build().toString());
        }

        return ResponseEntity.ok(allSets.get().toString());
    }

    // GET - a specific set's cards by ID
    @GetMapping("/{setId}/cards")
    @ResponseBody
    public ResponseEntity<String> getSetCards(@PathVariable String setId) {

        Optional<JsonArray> cards = cardSvc.getCardsBySetId(setId);

        if (cards.isEmpty()) {
            return ResponseEntity.ok(Json.createArrayBuilder().build().toString());
        }

        return ResponseEntity.ok(cards.get().toString());
    }

    // GET - a specific set by ID
    @GetMapping("/{setId}")
    @ResponseBody
    public ResponseEntity<String> getSet(@PathVariable String setId) {

        Optional<JsonObject> set = setSvc.getSet(setId);

        if (set.isEmpty()) {
            return ResponseEntity.ok(Json.createArrayBuilder().build().toString());
        }

        return ResponseEntity.ok(set.get().toString());
    }
    
    // POST - create a set
    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity<String> createSet(@RequestBody CardSet payload) {
        payload.setCreatedDate(new Date());
        
        boolean isCreated;
        try {
            isCreated = setSvc.createSet(payload);
        } catch (CardSetException e) {
            isCreated = false;
            e.printStackTrace();
        }

        JsonObject response = Json.createObjectBuilder()
                                .add("isCreated", isCreated)
                                .build();

        return ResponseEntity.ok(response.toString());
    }

    // PUT - edit set
    @PutMapping("/{setId}/edit")
    @ResponseBody
    public ResponseEntity<String> updateSet(@PathVariable String setId, 
                                            @RequestBody CardSet payload) {

        boolean isUpdated;
        try {
            isUpdated = setSvc.editSet(payload);
        } catch (CardSetException e) {
            isUpdated = false;
            e.printStackTrace();
        }
        
        JsonObject response = Json.createObjectBuilder()
                                .add("isUpdated", isUpdated)
                                .build();

        return ResponseEntity.ok(response.toString());
    }

    // DELETE - delete set
    @DeleteMapping("/{setId}/delete")
    @ResponseBody
    public ResponseEntity<String> deleteSet(@PathVariable String setId) {
        System.out.println(setId);

        boolean isDeleted;
        try {
            isDeleted = setSvc.deleteSet(setId);
        } catch (CardSetException e) {
            isDeleted = false;
            e.printStackTrace();
        }

        JsonObject response = Json.createObjectBuilder()
                                .add("isDeleted", isDeleted)
                                .build();

        return ResponseEntity.ok(response.toString());
    }

    // PUT - update review score
    @PutMapping("/{setId}/review/update")
    @ResponseBody
    public ResponseEntity<String> updateReviewScore(@PathVariable("setId") String setId,
                                                    @RequestBody String json) {

        JsonObject j = Json.createReader(new StringReader(json)).readObject();

        boolean isUpdated;
        try {
            isUpdated = setSvc.updateReviewScore(setId, j.getInt("correct"), j.getInt("wrong"));
        } catch (CardSetException e) {
            isUpdated = false;
            e.printStackTrace();
        }

        JsonObject response = Json.createObjectBuilder()
                                .add("isUpdated", isUpdated)
                                .build();
        
        return ResponseEntity.ok(response.toString());
    }

}
