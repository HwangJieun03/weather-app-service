import { useState, useEffect } from "react";
import { fetchAirQuality, AirQualityData } from "../../api/airQuality"; 
import { AirStatusStyle } from "../../styles/AirStatus.style";

function AirStatus({ lat, lon }: { lat: number; lon: number }) {
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAirQuality = async () => {
      setLoading(true);
      const data = await fetchAirQuality(lat, lon);
      setAirQuality(data);
      setLoading(false);
    };
    getAirQuality();
  }, [lat, lon]); 
  

  const getAirQualityLevel = (pm: number, type: "pm2_5" | "pm10") => {
    if (type === "pm2_5") {
      if (pm <= 15) return "좋음";
      if (pm <= 35) return "보통";
      if (pm <= 75) return "나쁨";
      return "매우 나쁨";
    }
    if (pm <= 30) return "좋음";
    if (pm <= 80) return "보통";
    if (pm <= 150) return "나쁨";
    return "매우 나쁨";
  };

  if (loading) {
    return <div>대기 상태를 불러오는 중...</div>;
  }

  const pm2_5 = airQuality?.list[0].components.pm2_5 ?? 0;
  const pm10 = airQuality?.list[0].components.pm10 ?? 0;

  const pm2_5Level = getAirQualityLevel(pm2_5, "pm2_5");
  const pm10Level = getAirQualityLevel(pm10, "pm10");

  return (
    <AirStatusStyle>
      <div>
        <h3>대기 상태</h3>
        <div>
            <p>초미세먼지 : {pm2_5} µg/m³ - {pm2_5Level}</p>
            <p>미세먼지 : {pm10} µg/m³ - {pm10Level}</p>
        </div>
      </div>
    </AirStatusStyle>
  );
}

export default AirStatus;