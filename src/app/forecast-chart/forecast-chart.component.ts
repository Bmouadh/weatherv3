import { Component, OnInit, AfterViewInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'forecast-chart',
  templateUrl: './forecast-chart.component.html',
  styleUrls: ['./forecast-chart.component.css'],
})
export class ForecastChartComponent implements OnInit, AfterViewInit {
  chart: am4charts.XYChart | null = null;
  error: any;
  forecast!: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getForecast().subscribe(
      (response) => {
        this.forecast = response;
        this.createChart(this.forecast);
      },
      (error) => {
        this.error = error.error;
        console.error('Error fetching forecast:', error.error.message);
      }
    );
  }

  ngAfterViewInit() {
    this.chart = am4core.create('chartdiv', am4charts.XYChart);
  }

  createChart(data: any[]) {
    if (!this.chart) {
      return;
    }

    this.chart.data = data.map((item) => ({
      date: new Date(item.dt_txt),
      temperature: item.main.temp,
      humidity: item.main.humidity,
      description: item.weather[0].description,
    }));

    // Create axes
    const categoryAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.labels.template.rotation = 45;
    categoryAxis.renderer.minGridDistance = 50;

    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    const temperatureSeries = this.chart.series.push(
      new am4charts.LineSeries()
    );
    temperatureSeries.dataFields.valueY = 'temperature';
    temperatureSeries.dataFields.dateX = 'date';
    temperatureSeries.tooltipText = '{valueY}°C';
    temperatureSeries.name = 'Temperature';
    temperatureSeries.strokeWidth = 2;
    temperatureSeries.minBulletDistance = 10;

    const humiditySeries = this.chart.series.push(new am4charts.LineSeries());
    humiditySeries.dataFields.valueY = 'humidity';
    humiditySeries.dataFields.dateX = 'date';
    humiditySeries.tooltipText = 'Humidity: {valueY}%';
    humiditySeries.name = 'Humidity';
    humiditySeries.strokeWidth = 2;
    humiditySeries.minBulletDistance = 10;

    // Add chart cursor
    this.chart.cursor = new am4charts.XYCursor();
    this.chart.cursor.behavior = 'zoomXY';

    // Add legend
    this.chart.legend = new am4charts.Legend();

    // Add scrollbar
    this.chart.scrollbarX = new am4core.Scrollbar();
  }
}
