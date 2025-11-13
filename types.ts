export enum ValveStatus {
  ON = 'ON',
  OFF = 'OFF',
}

export interface ValveEvent {
  status: ValveStatus;
  timestamp: Date;
  duration?: string;
}

// Weather Types
export enum WeatherCondition {
  Clear = 'Clear',
  PartlyCloudy = 'Partly Cloudy',
  Cloudy = 'Cloudy',
  Rain = 'Light Rain',
  Windy = 'Windy',
}

export interface WindInfo {
  speed: number; // in km/h
  direction: string;
}

export interface WeatherData {
  location: string;
  temperature: number; // in Celsius
  condition: WeatherCondition;
  wind: WindInfo;
}
