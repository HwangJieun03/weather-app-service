import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchForecast, ForecastData } from '../../api/weatherForecast';

function Forecast() {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const lat = 37.5665; // 서울의 위도
    const lon = 126.9788; // 서울의 경도

    const getForecast = async () => {
      setLoading(true);
      const data = await fetchForecast(lat, lon);
      setForecastData(data);
      setLoading(false);
    };

    getForecast();
  }, []);

  const getMinMaxTempForDay = (date: string) => {
    const dayForecasts = forecastData?.list.filter(
      (forecast) => forecast.dt_txt.startsWith(date)
    );

    if (dayForecasts) {
      const temps = dayForecasts.map((forecast) => forecast.main.temp);
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);
      return { minTemp: Math.floor(minTemp), maxTemp: Math.floor(maxTemp) };
    }
    return { minTemp: null, maxTemp: null };
  };

  const getWeatherDescriptionForDay = (date: string) => {
    const dayForecasts = forecastData?.list.filter(
      (forecast) => forecast.dt_txt.startsWith(date)
    );

    if (dayForecasts) {
      const weatherDescription = dayForecasts[0].weather[0].description;
      return weatherDescription;
    }
    return '';
  };

  if (loading) {
    return <div>날씨 예보를 불러오는 중...</div>;
  }

  const get5DayForecast = () => {
    const days = [];
    for (let i = 0; i < 5; i++) {
      const forecast = forecastData?.list[i * 8]; 
      if (forecast) {
        const date = forecast.dt_txt.split(' ')[0]; 
        const { minTemp, maxTemp } = getMinMaxTempForDay(date);
        const weatherDescription = getWeatherDescriptionForDay(date); 
        days.push({ date, minTemp, maxTemp, weatherDescription });
      }
    }
    return days;
  };

  return (
    <ForecastStyle>
      <h2>5일간의 날씨 예보</h2>
      <div className="forecast-grid">
        {get5DayForecast().map((forecast, index) => (
          <div key={index} className="forecast-item">
            <p>{forecast.date}</p>
            <p>최고 기온: {forecast.maxTemp} °C</p>
            <p>최저 기온: {forecast.minTemp} °C</p>
            <p>날씨: {forecast.weatherDescription}</p> 
          </div>
        ))}
      </div>
    </ForecastStyle>
  );
}

const ForecastStyle = styled.div`
  padding: 20px;
  text-align: center;

  .forecast-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    gap: 20px;
  }

  .forecast-item {
    background-color: #f0f0f0;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    border: 1px solid #ddd;
  }

  div {
    margin-bottom: 20px;
  }
`;

export default Forecast;
