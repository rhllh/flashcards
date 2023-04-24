# flashcards

## deployment

Deployed to [Railway](https://rhllh-flashcards.up.railway.app).

## sample user for login

- Username: ```rhllh```
- Password: ```rhllh```

## endpoints

1. ```POST /api/auth/validate``` - Validate user credentials
2. ```POST /api/auth/create``` - Create new user
3. ```GET /api/set/all``` - Get all sets of user
4. ```GET /api/set/{setId}/cards``` - Get a specific set's cards
5. ```GET /api/set/{setId}``` - Get information about a set
6. ```POST /api/set/create``` - Create a new card set
7. ```PUT /api/set/{setId}/edit``` - Edit a card set
8. ```DELETE /api/set/{setId}/delete``` - Delete a card set
9. ```PUT /api/set/{setId}/review/update``` - Update review scores of a card set
10. ```POST /api/card/create``` - Create a new card
11. ```PUT /api/card/edit``` - Edit a card
12. ```DELETE /api/card/delete``` - Delete a card