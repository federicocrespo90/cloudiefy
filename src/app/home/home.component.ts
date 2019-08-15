import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { IWeather, IWeatherCurrent, IForecastDay, IDay } from '../shared/interfaces/weather.interface'
import { WeatherService } from '@app/shared/weather.service';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  weather: IWeather;
  current: IWeatherCurrent;
  extendedWeather: IWeather;
  forecastDay: IDay[];
  currentDate: string[];
  isLoading: boolean;

  weatherForm: FormGroup;

  constructor(
    private weatherService: WeatherService,
    private fb: FormBuilder
  ) {
    this.weatherForm = this.fb.group({
      location: [
        'Argentina',
        Validators.required
      ],
      type: [
        'c',
        Validators.required
      ]
    });
  }

  getWeather(location: string) {
    this.isLoading = true;
    this.weatherService.get(location)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((res: IWeather) => {
        this.weather = res;
        this.current = this.weather.current;
    });
    this.weatherService.getNextDays(location)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((res: IWeather) => {
        this.extendedWeather = res;
        this.forecastDay = this.extendedWeather.forecast.forecastday.map((item: IForecastDay) => item.day);
        this.currentDate = this.extendedWeather.forecast.forecastday.map((item: IForecastDay) => item.date);
    });
  }

  get location() { return this.weatherForm.get('location'); }
  get type() { return this.weatherForm.get('type'); }

  ngOnInit() {
    this.go();
  }

  onTypeChange(e: any) {
    this.type.setValue(e.value, {
      onlySelf: true
    });
  }

  go() {
    this.getWeather(
      this.weatherForm.get('location').value
    ); 
  }
}
