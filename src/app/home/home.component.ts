import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { IWeather } from '../shared/interfaces/weather.interface'
import { WeatherService } from '@app/home/weather.service';

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
  isLoading: boolean;

  weatherForm: FormGroup;

  constructor(
    private weatherService: WeatherService,
    private fb: FormBuilder
  ) {
    this.weatherForm = this.fb.group({
      country: [
        'argentina',
        Validators.required
      ],
      type: [
        'c',
        Validators.required
      ]
    });
  }

  getByCountry(country: string, res: IWeather) {
    this.isLoading = true;
    this.weatherService.get(country)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((res: IWeather) => {
        this.weather = res;
    });
  }

  get country() { return this.weatherForm.get('country'); }
  get type() { return this.weatherForm.get('type'); }

  ngOnInit() {
    this.getByCountry(
      this.weatherForm.get('country').value,
      this.weather
    ) 
  }
}
