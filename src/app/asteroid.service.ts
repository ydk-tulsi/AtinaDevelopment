import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsteroidService {
  private apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed';

  constructor(private httpClient: HttpClient) {}

  getRange(startDate: string, endDate: string) {
    const apiKey = 'Zl5ZDEoyJTKoxSmrwLJV2yCu547BMGcSUnnEC1Uy';
    this.apiUrl =
      this.apiUrl +
      '?start_date=' +
      startDate +
      '&end_date=' +
      endDate +
      '&api_key=' +
      apiKey;
    console.log(this.apiUrl);

    return this.httpClient.get(this.apiUrl);
  }
}
