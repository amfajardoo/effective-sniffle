import { createReducer, on } from "@ngrx/store";
import { Weather } from "@weather/interfaces/weather";
import { loadWeatherSuccess } from "./weather.actions";

export interface WeatherState extends Weather {}

export const initialState: WeatherState = {
  location: '',
  temp: 0
}

export const weatherReducer = createReducer(
  initialState,
  on(loadWeatherSuccess, (state, { location, temp }) => ({ ...state, location, temp }))
)