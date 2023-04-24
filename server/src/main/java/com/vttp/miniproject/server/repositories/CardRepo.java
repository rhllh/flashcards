package com.vttp.miniproject.server.repositories;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
import com.vttp.miniproject.server.models.Card;

import static com.vttp.miniproject.server.repositories.Queries.*;

@Repository
public class CardRepo {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Optional<List<Card>> getCardsBySetId(String setId) {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(GET_CARDS_BY_SETID, setId);

        List<Card> cards = new LinkedList<>();
        while (rs.next()) {
            cards.add(Card.create(rs));
        }

        if (cards.size() == 0) return Optional.empty();

        return Optional.of(cards);
    }

    public int createCardBySetId(Card card) {
        return jdbcTemplate.update(CREATE_CARD_BY_SETID, card.getSetId(), 
                        card.getPresented(), card.getHidden(), card.getImageFile(), new Date());
    }

    public int updateCardByID(Card card) {
        return jdbcTemplate.update(UPDATE_CARD_BY_ID, card.getPresented(),
                        card.getHidden(), card.getImageFile(), new Date(), card.getId());
    }

    public int deleteCardById(int id) {
        return jdbcTemplate.update(DELETE_CARD_BY_ID, id);
    }

    public int deleteCardsBySetId(int setId) {
        return jdbcTemplate.update(DELETE_CARDS_BY_SET_ID, setId);
    }
}

