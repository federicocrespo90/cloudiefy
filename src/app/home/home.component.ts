import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { IWeather } from '../shared/interfaces/weather.interface'
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
  weathers: IWeather;
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
    });
    this.weatherService.getNextDays(
      this.weatherForm.get('location').value
      ).pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((res: IWeather) => {
        this.weathers = res;
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

  showNextDays() {}
}
