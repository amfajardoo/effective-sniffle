import { WeatherState } from "./weather.reducer";
import { selectWeatherState, selectWeather } from "./weather.selectors";

describe('Weather Selectors', () => {

  const initialState: WeatherState = {
    location: 'Colombia, Sabaneta',
    temp: 70
  }

  it('should select the weather state', () => {
    const result = selectWeatherState.projector(initialState);
    expect(initialState).toEqual(result);
  });

  it('it should select the weather if there is a location', () => {
    const result = selectWeather.projector(initialState);
    expect(result).toBeDefined();
  });

  it('it should return undefined is there is not a location', () => {
    const noLocationState: WeatherState = {
      location: '',
      temp: 0
    }
    const result = selectWeather.projector(noLocationState);
    expect(result).not.toBeDefined();
  });
});
