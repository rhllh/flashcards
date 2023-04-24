package com.vttp.miniproject.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vttp.miniproject.server.exceptions.CardException;
import com.vttp.miniproject.server.models.Card;
import com.vttp.miniproject.server.services.CardService;
import com.vttp.miniproject.server.services.S3Service;

import jakarta.json.Json;

@RestController
@RequestMapping("/api/card")
@CrossOrigin()
public class CardController {

    @Autowired
    private CardService cardSvc;

    @Autowired
    private S3Service s3Svc;

    // POST - create card
    @PostMapping(path="/create", consumes=MediaType.MULTIPART_FORM_DATA_VALUE,
                    produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> createCard(@RequestPart("setId") String setId,
                            @RequestPart("presented") String presented, @RequestPart("hidden") String hidden,
                            @RequestPart(value="imageFile", required=false) MultipartFile imageFile) {
        Card c = new Card();
        c.setSetId(Integer.parseInt(setId));
        c.setPresented(presented);
        c.setHidden(hidden);
        
        String imageString = "";
        boolean isCreated;
        try {
            if (imageFile != null) {
                imageString = s3Svc.upload(imageFile, setId+"_"+presented);
                c.setImageFile(imageString);
            }
            isCreated = cardSvc.createCardBySetId(c);
        } catch (Exception e) {
            e.printStackTrace();
            isCreated = false;
        }

        return ResponseEntity.ok(Json.createObjectBuilder()
                                .add("isCreated", isCreated)
                                .build().toString());
    }

    // PUT - edit card
    @PutMapping(path="/edit", consumes=MediaType.MULTIPART_FORM_DATA_VALUE,
                                produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> editCard(@RequestPart("setId") String setId,
                            @RequestPart("id") String id,
                            @RequestPart("presented") String presented, @RequestPart("hidden") String hidden,
                            @RequestPart(value="imageFile", required=false) MultipartFile imageFile) {
        Card c = new Card();
        c.setId(Integer.parseInt(id));
        c.setSetId(Integer.parseInt(setId));
        c.setPresented(presented);
        c.setHidden(hidden);

        boolean isUpdated;
        String imageString = "";
        try {
            if (imageFile != null) {
                imageString = s3Svc.upload(imageFile, setId+"_"+presented);
                c.setImageFile(imageString);
            }
            isUpdated = cardSvc.updateCardByID(c);
        } catch (Exception e) {
            isUpdated = false;
            e.printStackTrace();
        }

        return ResponseEntity.ok(Json.createObjectBuilder()
                    .add("isUpdated", isUpdated)
                    .build()
                    .toString());
    }

    // DELETE - delete card
    @DeleteMapping("/delete")
    @ResponseBody
    public ResponseEntity<String> deleteCard(@RequestParam int id) {

        boolean isDeleted;
        try {
            isDeleted = cardSvc.deleteCardById(id);
        } catch (CardException e) {
            isDeleted = false;
            e.printStackTrace();
        }

        return ResponseEntity.ok(Json.createObjectBuilder()
                    .add("isDeleted", isDeleted)
                    .build()
                    .toString());
    }
}
