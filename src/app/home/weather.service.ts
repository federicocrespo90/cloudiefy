import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

//https://api.apixu.com/v1/current.json?key=a549c7d3ae85469393e142739192207&q=Argentina

@Injectable()
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  get(query: string): Observable<any> {
    return this.httpClient
      .get(`q=${query}`);
  }
}
