import React, {  createContext, useContext, useEffect, useState } from "react";

interface GeolocationContextType {
  lat: number | null;
  lon: number | null;
}

const GeolocationContext = createContext<GeolocationContextType | undefined>(undefined);

export const GeolocationProvider: React.FC <{ children: React.ReactNode }> = ({ children }) =>  {
  const [coordinates, setCoordinates] = useState<{ lat: number | null; lon: number | null }>({
    lat: null,
    lon: null,
  });

  useEffect(() => {
    // Geolocation API를 사용하여 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("위치를 가져오는 데 실패했습니다.", error);
        }
      );
    }
  }, []);

  return (
    <GeolocationContext.Provider value={coordinates}>
      {children}
    </GeolocationContext.Provider>
  );
};

export const useGeolocation = (): GeolocationContextType => {
  const context = useContext(GeolocationContext);
  if (!context) {
    throw new Error("useGeolocation은 GeolocationProvider 내에서만 사용 가능합니다.");
  }
  return context;
};
