import { useState, useEffect } from 'react';
import { fetchForecast, ForecastData } from '../../api/weatherForecast';
import { ForecastStyle } from '../../styles/Forecast.style';
import ForecastItem from './ForecastItem';

function Forecast({ lat, lon }: { lat: number; lon: number }) {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getForecast = async () => {
      setLoading(true);
      const data = await fetchForecast(lat, lon);
      setForecastData(data);
      setLoading(false);
    };
    getForecast();
  }, [lat, lon]);

  if (loading) {
    return <div>날씨 예보를 불러오는 중...</div>;
  }

  const get5DayForecast = () => {
    const days = [];
    for (let i = 0; i < 5; i++) {
      const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

      const forecast = forecastData?.list[i * 8];
      if (forecast) {
        const date = forecast.dt_txt.split(' ')[0];
        const dayForecasts = forecastData.list.filter(f => f.dt_txt.startsWith(date));
        const temps = dayForecasts.map(f => f.main.temp);
        const minTemp = Math.min(...temps);
        const maxTemp = Math.max(...temps);
        const weatherDescription = dayForecasts[0].weather[0].description;
        const dayOfWeek = dayNames[new Date(date).getDay()];
        days.push({ date,dayOfWeek, minTemp: Math.floor(minTemp), maxTemp: Math.floor(maxTemp), weatherDescription });
      }
    }
    return days;
  };

  return (
    <ForecastStyle>
      <h2>5일간의 날씨 예보</h2>
      <div className="forecast-grid">
        {get5DayForecast().map((forecast, index) => (
          <ForecastItem key={index} {...forecast} />
        ))}
      </div>
    </ForecastStyle>
  );
}
export default Forecast;