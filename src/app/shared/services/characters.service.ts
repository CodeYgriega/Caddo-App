import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Character } from '../models/characters';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  _url = environment.characters;
  _http = inject(HttpClient);

  getCharacters(_page?: number, _limit?: number) {
    return _page && _limit
      ? this._http.get<Character[]>(`${this._url}?_page=${_page}&_limit=${_limit}`)
      : this._http.get<Character[]>(this._url);
  }

  getCharacterById(id: number) {
    return this._http.get<Character>(`${this._url}/${id}`);
  }

  createCharacter(character: Character) {
    return this._http.post<Character>(this._url, character);
  }

  filterCharacter(property: string, value: string){
    return this._http.get<Character[]>(`${this._url}?${property}_like=${value}`)
  }
}
