export interface IWeatherCondition {
    code: number;
    icon: string;
    text: string;
}

export interface IForecast {
    forecastday: Array<IForecastDay>;
}

export interface IDay {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    condition: IWeatherCondition;
    uv: number;
}

export interface IAstro {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
}

export interface IForecastDay {
    date: string;
    date_epoch: number;
    day: IDay;
    astro: IAstro;

}
  
export interface IWeatherCurrent {
    cloud: number;
    condition: IWeatherCondition;
    feelslike_c: number;
    feelslike_f: number;
    gust_kph: number;
    gust_mph: number;
    humidity: number;
    is_day: number;
    last_updated: string;
    last_updated_epoch: number;
    precip_in: number;
    precip_mm: number;
    pressure_in: number;
    pressure_mb: number;
    temp_c: number;
    temp_f: number;
    uv: number;
    vis_km: number;
    vis_miles: number;
    wind_degree: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
}

export interface IWeatherLocation {
    country: string;
    lat: number;
    lon: number;
    localtime: string;
    localtime_epoch: number;
    name: string;
    region: string;
    tz_id: string;
}

export interface IWeather {
    current: IWeatherCurrent;
    location: IWeatherLocation;
    forecast?: IForecast;
    alert?: any;
}
  