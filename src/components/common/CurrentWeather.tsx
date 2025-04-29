import { useQuery } from "@tanstack/react-query";
import { fetchWeather, WeatherData } from "../../api/weather";
import LocationFetcher from "./LocationFeatcher";
import { CurrentWeatherStyle } from "../../styles/CurrentWeather.style";
import { WeatherInfo } from "../../styles/CurrentWeather.style";
import { useEffect, useState } from "react";

interface CurrentWeatherProps {
  lat: number;
  lon: number;
  onCoordinatesChange: (coords: { lat: number; lon: number }) => void;
}

function CurrentWeather({ lat, lon, onCoordinatesChange }: CurrentWeatherProps) {
  const [currentLat, setCurrentLat] = useState(lat);
  const [currentLon, setCurrentLon] = useState(lon);

  useEffect(() => {
    setCurrentLat(lat);
    setCurrentLon(lon);
  }, [lat, lon]); 

  const { data, isLoading, error } = useQuery<WeatherData, Error>({
    queryKey: ["currentWeather", currentLat, currentLon],
    queryFn: async () => fetchWeather(currentLat, currentLon),
    enabled: currentLat !== undefined && currentLon !== undefined,
  });

  const handleLocationChange = (lat: number, lon: number) => {
    setCurrentLat(lat);
    setCurrentLon(lon);
    onCoordinatesChange({ lat, lon }); 
  };

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

export default CurrentWeather;
