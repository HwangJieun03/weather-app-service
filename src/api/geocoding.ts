import axios from 'axios';

const GEOCODING_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

export const fetchCoordinates = async (city: string) => {
  const response = await axios.get(GEOCODING_API_URL, {
    params: {
      q: city, 
      appid: API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  });

  return response.data.coord; 
};
