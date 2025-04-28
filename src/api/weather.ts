import axios from 'axios';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: [
    {
      description: string;
    }
  ];
}

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await axios.get(BASE_URL, {
    params: {
      lat, 
      lon, 
      appid: API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  });

  return response.data;
};
