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
      ]
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.weatherService.get('argentina')
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((res: IWeather) => {
        console.log(res);
        debugger;
        this.weather = res;
        this.weather.location;
      });
  }

  get country() { return this.weatherForm.get('country'); }

}
