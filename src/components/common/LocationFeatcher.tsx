import React from "react";
import Button from "./Button";

interface LocationFetcherProps {
  onLocationChange: (lat: number, lon: number) => void;
}

const LocationFetcher: React.FC<LocationFetcherProps> = ({ onLocationChange }) => {
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationChange(latitude, longitude); 
        },
        (error) => {
          console.error("위치를 가져오는 데 실패했습니다.", error);
        }
      );
    } else {
      console.log("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
  };

  return <Button onClick={getLocation}>현재 위치 확인</Button>;
};

export default LocationFetcher;
