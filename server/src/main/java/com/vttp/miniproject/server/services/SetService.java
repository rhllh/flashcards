package com.vttp.miniproject.server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vttp.miniproject.server.exceptions.CardSetException;
import com.vttp.miniproject.server.models.CardSet;
import com.vttp.miniproject.server.repositories.CardRepo;
import com.vttp.miniproject.server.repositories.SetRepo;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

@Service
public class SetService {

    @Autowired
    private SetRepo setRepo;

    @Autowired
    private CardRepo cardRepo;

    public Optional<JsonArray> getAllSets(String creatorId) {
        Optional<List<CardSet>> cardSetOpt = setRepo.getAllSets(creatorId);

        if (cardSetOpt.isEmpty()) {
            return Optional.empty();
        }

        JsonArrayBuilder jab = Json.createArrayBuilder();
        for (CardSet cs : cardSetOpt.get()) {
            jab.add(cs.toJSON());
        }

        return Optional.of(jab.build());
    }

    public Optional<JsonObject> getSet(String setId) {
        Optional<CardSet> csOpt = setRepo.getSet(setId);

        if (csOpt.isEmpty()) {
            return Optional.empty();
        }

        JsonObject json = csOpt.get().toJSON();

        return Optional.of(json);
    }

    @Transactional(rollbackFor = CardSetException.class)
    public boolean createSet(CardSet cardSet) throws CardSetException {
        return setRepo.createSet(cardSet);
    }

    @Transactional(rollbackFor = CardSetException.class)
    public boolean editSet(CardSet cardSet) throws CardSetException {
        return setRepo.editSet(cardSet);
    }

    @Transactional(rollbackFor = CardSetException.class)
    public boolean deleteSet(String setId) throws CardSetException {
        cardRepo.deleteCardsBySetId(Integer.parseInt(setId));

        return setRepo.deleteSet(setId);
    }

    @Transactional(rollbackFor = CardSetException.class)
    public boolean updateReviewScore(String setId, int correct, int wrong)
                                throws CardSetException {
        return setRepo.updateReviewScore(setId, correct, wrong);
    }
}
