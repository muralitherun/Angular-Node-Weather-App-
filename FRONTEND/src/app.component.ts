import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputValue: string = '';
  weatherReport: any = null;
  temperatureUnit: string = '°C';
  toggleButtonText: string = 'Toggle to Fahrenheit';

  constructor(private apiService: ApiService) {}

  getWeatherReport() {
    this.apiService.getWeatherReport(this.inputValue).subscribe(response => {
      if (response) {
        this.weatherReport = response;
        this.updateToggleButtonText();
        
      }
    });
  }

  toggleTemperatureUnit() {
    if (this.temperatureUnit === '°C') {
      this.temperatureUnit = '°F';
      this.weatherReport.temperature = this.celsiusToFahrenheit(this.weatherReport.temperature);
    } else {
      this.temperatureUnit = '°C';
      this.weatherReport.temperature = this.fahrenheitToCelsius(this.weatherReport.temperature);
    }
    this.updateToggleButtonText();
  }

  celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32;
  }

  fahrenheitToCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) * 5/9;
  }

  updateToggleButtonText() {
    this.toggleButtonText = `${this.temperatureUnit === '°C' ? 'Fahrenheit' : 'Celsius'}`;
  }
}