import axios from 'axios';

// 대기질 데이터 인터페이스
export interface AirQualityData {
  list: [
    {
      main: {
        aqi: number; // Air Quality Index (대기질 지수)
      };
      components: {
        co: number;  // 일산화탄소
        no: number;  // 일산화질소
        no2: number; // 이산화질소
        o3: number;  // 오존
        so2: number; // 이산화황
        pm2_5: number; // 미세먼지
        pm10: number; // 미세먼지
        nh3: number; // 암모니아
      };
    }
  ];
}

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const AIR_QUALITY_URL = 'https://api.openweathermap.org/data/2.5/air_pollution';

// 대기질 데이터 가져오는 함수
export const fetchAirQuality = async (lat: number, lon: number): Promise<AirQualityData> => {
  const response = await axios.get(AIR_QUALITY_URL, {
    params: {
      lat,
      lon,
      appid: API_KEY,
    },
  });
  console.log('Air Quality Data:', response.data);
  return response.data;
};
