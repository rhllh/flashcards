package com.vttp.miniproject.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.vttp.miniproject.server.models.CardSet;

import static com.vttp.miniproject.server.repositories.Queries.*;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Repository
public class SetRepo {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Optional<List<CardSet>> getAllSets(String creatorId) {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(GET_ALL_SETS, creatorId);

        List<CardSet> cardSets = new LinkedList<>();
        while (rs.next()) {
            cardSets.add(CardSet.create(rs));
        }
        
        if (cardSets.size() == 0) return Optional.empty();

        return Optional.of(cardSets);
    }

    public Optional<CardSet> getSet(String setId) {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(GET_SET_BY_SET_ID, setId);

        CardSet cs = new CardSet();
        while (rs.next()) {
            cs = CardSet.create(rs);
        }

        return Optional.of(cs);
    }

    public boolean createSet(CardSet cardSet) {
        return jdbcTemplate.update(CREATE_CARD_SET, cardSet.getCreatorId(), cardSet.getTitle(), 
                                    cardSet.getDescription(), cardSet.getCreatedDate()) > 0;
    }

    public boolean editSet(CardSet cardSet) {
        return jdbcTemplate.update(UPDATE_CARD_SET, cardSet.getCreatorId(), cardSet.getTitle(),
                        cardSet.getDescription(), cardSet.getCreatedDate(), cardSet.getId()) > 0;
    }

    public boolean deleteSet(String setId) {
        return jdbcTemplate.update(DELETE_CARD_SET, setId) > 0;
    }

    public boolean updateReviewScore(String setId, int correct, int wrong) {
        return jdbcTemplate.update(UPDATE_REVIEW_SCORE_OF_SET, LocalDate.now(), correct*100/(wrong+correct), setId) > 0;
    }
}
