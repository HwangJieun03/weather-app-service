import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather, WeatherData } from "../../api/weather";
import LocationFetcher from "./LocationFeatcher"; 
import { useState } from "react";


function CurrentWeather() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );

  const handleLocationChange = (lat: number, lon: number) => {
    setLocation({ lat, lon });
  };

  const { data, isLoading, error } = useQuery<WeatherData, Error>({
    queryKey: ["currentWeather", location],
    queryFn: async () => {
      if (!location) {
        throw new Error("위치 정보가 없습니다.");
      }
      return fetchWeather(location.lat, location.lon);
    },
    enabled: !!location,
  });

  // if (!location) {
  //   return <div>위치 정보를 선택해주세요.</div>; 
  // }

  if (isLoading) return <div>로딩 중...</div>;
  if (error instanceof Error) return <div>에러 발생! {error.message}</div>;

  return (
    <CurrentWeatherStyle>
      <WeatherInfo>
        <p className="location">{data?.name}</p>
        <p className="temp">{data?.main?.temp} °C</p>
        <p className="description">{data?.weather[0]?.description}</p>
      </WeatherInfo>

      <LocationFetcher onLocationChange={handleLocationChange} />
    </CurrentWeatherStyle>
  );
}

const CurrentWeatherStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const WeatherInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  max-width: 600px;
  padding: 10px;

  .temp {
    font-weight: bold;
  }
`;

export default CurrentWeather;
