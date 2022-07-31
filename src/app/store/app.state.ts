import { weatherFeatureKey } from "./features-keys";
import { WeatherState } from "./weather/weather.reducer";

export interface AppState {
  [weatherFeatureKey]: WeatherState
}