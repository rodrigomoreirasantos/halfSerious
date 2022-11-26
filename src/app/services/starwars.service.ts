import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count, Observable } from 'rxjs';

import { Response } from '../Response';
import { StarWarsType } from '../StarWarsType'


@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  private baseApiUrl = 'https://swapi.dev/api'
  private apiUrl = `${this.baseApiUrl}/vehicles`;
  private spaceships: StarWarsType[] = [];

  constructor(private http: HttpClient) { }

  getPageSpaceships(url: string):Observable<Response<StarWarsType[]>>{
    return this.http.get<Response<StarWarsType[]>>(url)
  }

  getStarWarsSapaceship(onData: (spaceships: StarWarsType[]) => void) {
    this.getPageSpaceships(this.apiUrl).subscribe(response => {
      this.spaceships = [...this.spaceships, ...response.results];

      if (!response.next) {
        onData([...this.spaceships]);
      } else {
        this.apiUrl = response.next;
        this.getStarWarsSapaceship(onData);
      }
    })
  }

  getPilots(pilots: string[], onData: (pilots: any) => void) {
    let pilotsInfo: any = [];
    let pilotsLoaded = 0;

    if (pilots.length == 0) {
      onData([]);
      return;
    }

    pilots.map((url) => {
      this.http.get<Response<StarWarsType[]>>(url).subscribe(pilotInfo => {
        pilotsInfo.push(pilotInfo);

        pilotsLoaded++;

        if (pilots.length == pilotsLoaded) {
          onData(pilotsInfo);
        }
      })
    })
  }
}
