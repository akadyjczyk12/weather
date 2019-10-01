import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseUrl = 'https://weather-ydn-yql.media.yahoo.com/forecastrss?format=json&u=c';

  constructor() { }
}
