import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = []

  private _tagsHistory: string[] = []
  private apiKey: string = 'rtWICZP9CehqDXpIatAm7Jsy0NxwL3hB'
  private serviceURL: string = "http://api.giphy.com/v1/gifs"


  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log("Ready...")
   }

  private saveLocalStorage(): void{
    localStorage.setItem('history',JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(): void {
    const storedHistory = localStorage.getItem('history');
    this._tagsHistory = storedHistory ? JSON.parse(storedHistory) : [];

    // Verificar que el primer elemento no sea undefined o vacío
    if (this._tagsHistory.length > 0) {
      this.searchTag(this._tagsHistory[0]);
    }
  }


  get tagsHistory(){
    return [...this._tagsHistory]
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLocaleLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);

    // Mantener solo los 10 primeros elementos
    this._tagsHistory = this._tagsHistory.slice(0, 10);  // Usar slice para obtener una nueva lista
    this.saveLocalStorage();
  }

  searchTag(tag: string): void {
    if (tag.length == 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit',10)
    .set('q',tag)

    this.http.get<SearchResponse>(`${this.serviceURL}/search`,{params})
    .subscribe(
      resp => {

        this.gifList = resp.data;
        console.log({gifs: this.gifList})
      }
    );
    // fetch('http://api.giphy.com/v1/gifs/search?api_key=rtWICZP9CehqDXpIatAm7Jsy0NxwL3hB&q=lol&limit=10')
    // .then( resp => resp.json())
    // .then(data => console.log(data))

  }



}
