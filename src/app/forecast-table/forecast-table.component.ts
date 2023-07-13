import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'forecast-table',
  templateUrl: './forecast-table.component.html',
  styleUrls: ['./forecast-table.component.css'],
})
export class ForecastTableComponent implements OnInit {
  forecast: any;
  error: any;
  displayedColumns!: string[];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getForecast().subscribe(
      (response) => {
        this.forecast = response;
      },
      (error) => {
        this.error = error.error;
        
      }
    );

    this.displayedColumns = ['Date', 'Temperature', 'Humidity', 'Description'];
  }
}
