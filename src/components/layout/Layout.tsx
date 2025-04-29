import Header from "../common/Header";
import AirStatus from "../common/AirStatus";
import SearchLocation from "../common/SearchLocation";
import Forecast from "../common/Forecast";
import { useState, useEffect } from "react";
import { LayoutStyle } from "../../styles/Layout.style";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const handleCoordinatesChange = (newCoordinates: {
    lat: number;
    lon: number;
  }) => {
    setCoordinates(newCoordinates);
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => console.error("위치 정보를 가져오는데 실패했습니다.", error)
      );
    }
  }, []);
  if (!coordinates) {
    return <div>위치 정보를 가져오는 중입니다...</div>;
  }

  return (
    <LayoutStyle>
      <Header
        coordinates={coordinates}
        onCoordinatesChange={handleCoordinatesChange}
      />
      <main>{children}</main>
      <AirStatus lat={coordinates.lat} lon={coordinates.lon} />
      <SearchLocation onCoordinatesChange={handleCoordinatesChange} />
      <Forecast lat={coordinates.lat} lon={coordinates.lon} />
    </LayoutStyle>
  );
}

export default Layout;
