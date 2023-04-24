package com.vttp.miniproject.server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vttp.miniproject.server.exceptions.CardException;
import com.vttp.miniproject.server.models.Card;
import com.vttp.miniproject.server.repositories.CardRepo;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;

@Service
public class CardService {
    
    @Autowired
    private CardRepo cardRepo;

    public Optional<JsonArray> getCardsBySetId(String setId) {
        Optional<List<Card>> cardsOpt = cardRepo.getCardsBySetId(setId);

        if (cardsOpt.isEmpty()) {
            return Optional.empty();
        }

        JsonArrayBuilder jab = Json.createArrayBuilder();
        for (Card c : cardsOpt.get()) {
            jab.add(c.toJSON());
        }

        return Optional.of(jab.build());
    }

    @Transactional(rollbackFor = CardException.class)
    public boolean createCardBySetId(Card card) throws CardException {
        
        return cardRepo.createCardBySetId(card) > 0;
    }

    @Transactional(rollbackFor = CardException.class)
    public boolean updateCardByID(Card card) throws CardException {

        return cardRepo.updateCardByID(card) > 0;
    }

    @Transactional(rollbackFor = CardException.class)
    public boolean deleteCardById(int id) throws CardException {

        return cardRepo.deleteCardById(id) > 0;
    }
}
