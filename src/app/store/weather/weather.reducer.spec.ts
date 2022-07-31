import { Weather } from '@weather/interfaces/weather';
import { loadWeatherSuccess } from './weather.actions';
import { weatherReducer, initialState } from './weather.reducer';

describe('Weather Reducer', () => {
  describe('an unknown action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const result = weatherReducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });

  describe('loadWeatherSuccess action', () => {
    it('should retrieve weather state and update the state in an immutable way', () => {
      const newState: Weather = {
        location: 'Colombia',
        temp: 50
      }

      const action = loadWeatherSuccess(newState);
      const state = weatherReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    })
  })
});
