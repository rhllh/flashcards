import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cardsSharingObj: any;
  private cardsToReviewSharingObj: any;

  get cardsSharingObjValue() {
    return this.cardsSharingObj;
  }

  set cardsSharingObjValue(obj) {
    this.cardsSharingObj = obj;
  }

  get cardsToReviewSharingObjValue() {
    return this.cardsToReviewSharingObj;
  }

  set cardsToReviewSharingObjValue(obj) {
    this.cardsToReviewSharingObj = obj;
  }

  constructor(private http: HttpClient) { }

  getAllCardsFromSetById(setId: number): Promise<any> {

    return lastValueFrom(
      this.http.get<any>(`https://rhllh-flashcards.up.railway.app/api/set/${setId}/cards`)
    );
  }

  createCardBySetId(formData: FormData): Promise<any> {
    
    return lastValueFrom(
      this.http.post<any>(`https://rhllh-flashcards.up.railway.app/api/card/create`, formData)
    );
  }

  updateCardById(formData: FormData): Promise<any> {
    
    return lastValueFrom(
      this.http.put<any>(`https://rhllh-flashcards.up.railway.app/api/card/edit`, formData)
    );
  }

  deleteCardById(card: Card): Promise<any> {
    
    const params = new HttpParams()
                    .set('id', card.id);
    
    return lastValueFrom(
      this.http.delete<any>(`https://rhllh-flashcards.up.railway.app/api/card/delete`, {params})
    );
  }
}
