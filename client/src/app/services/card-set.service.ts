import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardSet } from '../models/card-set.model';
import { last, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardSetService {

  private setSharingObj: any;

  constructor(private http: HttpClient) { }

  get setSharingObjValue() {
    return this.setSharingObj;
  }

  set setSharingObjValue(obj) {
    this.setSharingObj = obj;
  }

  getAllSetsForLanding(creatorId: string): Promise<CardSet[]> {
    
    const params = new HttpParams()
                    .set('creatorId', creatorId);

    return lastValueFrom(
      this.http.get<any>('https://rhllh-flashcards.up.railway.app/api/set/all', {params})
    );
  }

  getSetById(setId: number): Promise<CardSet> {

    return lastValueFrom(
      this.http.get<CardSet>(`https://rhllh-flashcards.up.railway.app/api/set/${setId}`)
    );
  }

  postNewCardSet(cardSet: CardSet): Promise<any> {
                                    
    return lastValueFrom(
      this.http.post<any>('https://rhllh-flashcards.up.railway.app/api/set/create', cardSet)
    );
  }

  updateCardSet(cardSet: CardSet): Promise<any> {
    
    return lastValueFrom(
      this.http.put<any>(`https://rhllh-flashcards.up.railway.app/api/set/${cardSet.id}/edit`, cardSet)
    );
  }

  deleteCardSet(setId: number): Promise<any> {

    return lastValueFrom(
      this.http.delete<any>(`https://rhllh-flashcards.up.railway.app/api/set/${setId}/delete`)
    );
  };

  updateReviewScore(setId: number, score: any): Promise<any> {
    
    return lastValueFrom(
      this.http.put<any>(`https://rhllh-flashcards.up.railway.app/api/set/${setId}/review/update`, score)
    );
  }
}
