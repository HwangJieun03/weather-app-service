import axios from 'axios';

export interface ForecastData {
  list: [
    {
      dt_txt: string;  // 예보 시간
      main: {
        temp: number;  // 기온
      };
      weather: [
        {
          description: string;  // 날씨 설명
        }
      ];
    }
  ];
}

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchForecast = async (lat: number, lon: number): Promise<ForecastData> => {
  const response = await axios.get(BASE_URL, {
    params: {
      lat, 
      lon, 
      appid: API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  });

  console.log(response.data);
  return response.data;
};
