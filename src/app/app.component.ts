import { Component } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'DashBoard Weather';
  activeTab = 0;
  matSidenavOpened = false;
  cityName!: string;

  constructor(private WeatherService: WeatherService) {}

  toggleMatSidenav(): void {
    this.matSidenavOpened = !this.matSidenavOpened;
  }

  // setCityName(cityName: string) {
  //   this.cityName = cityName;
  // }

  setCityName(cityName: string) {
    this.WeatherService.setCityName(cityName);
    this.activeTab = 1;
  }
}
