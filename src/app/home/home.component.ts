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
  isLoading: boolean;

  weatherForm: FormGroup;

  constructor(
    private weatherService: WeatherService,
    private fb: FormBuilder
  ) {
    this.weatherForm = this.fb.group({
      country: [
        'Argentina',
        Validators.required
      ],
      type: [
        'c',
        Validators.required
      ]
    });
  }

  getWeather(country: string, days?: number) {
    this.isLoading = true;
    this.weatherService.get(country, days > 1 ? days: 1)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((res: IWeather) => {
        this.weather = res;
    });
  }

  get country() { return this.weatherForm.get('country'); }
  get type() { return this.weatherForm.get('type'); }

  ngOnInit() {
    this.getWeather(
      this.weatherForm.get('country').value
    ); 
  }

  onTypeChange(e: any) {
    console.log(e.value)
    this.type.setValue(e.value, {
      onlySelf: true
    });
  }

  onTabChange(e: any) {
    if(e.index === 1)
      this.getWeather(this.weatherForm.get('country').value, 5); 
  }

  showNextDays() {}
}
