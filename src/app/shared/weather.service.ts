import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const config = {
  key: 'a549c7d3ae85469393e142739192207',
  current: 'current.json',
  forecast: 'forecast.json'
}

@Injectable()
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  get(query: string): Observable<any> {
    let uri = `${config.current}?key=${config.key}&q=${query}`;
    return this.httpClient
      .get(uri);
  }

  getNextDays(query: string): Observable<any> {
    let uri = `${config.forecast}?key=${config.key}&q=${query}&days=5`;
    return this.httpClient
      .get(uri);
  }
}
