import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  weather: any;
  error: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getCurrentWeather().subscribe(
      (response) => {
        this.weather = response;
      },
      (error) => {
        this.error = error.error;
        console.log(error);
      }
    );
  }

  // try {
  //   this.weather = this.weatherService.getCurrentWeather();
  //
  // } catch (error) {
  //   console.error(error);
  // }
}
