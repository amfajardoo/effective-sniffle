export interface Weather {
  location: string;
  temp: number;
}

export interface RapidApiWeatherReponse {
  locations: Location;
}

export interface Location {
  [key: string]: {
    currentConditions: Conditions;
  }
}

export interface Conditions {
  temp: number;
}