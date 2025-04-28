import { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchAirQuality, AirQualityData } from "../../api/airQuality"; // 대기질 API 함수

function AirStatus() {
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const lat = 37.5665; // 서울의 위도
    const lon = 126.9788; // 서울의 경도

    const getAirQuality = async () => {
      setLoading(true);
      const data = await fetchAirQuality(lat, lon);
      setAirQuality(data);
      setLoading(false);
    };
    getAirQuality();
  }, []);

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

const AirStatusStyle = styled.div`
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: left;
  border: 1px solid #ddd; 
  padding: 20px;
 background-color: #f0f0f0; 
`;

export default AirStatus;
