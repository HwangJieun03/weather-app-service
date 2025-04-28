import styled from "styled-components";
import InputText from "./InputText";
import Button from "./Button";
import { useState } from "react";
import { fetchCoordinates } from "../../api/geocoding";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

function SearchLocation() {
  const [cityName, setCityName] = useState<string>("");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleSearch = async () => {
    if (cityName.trim()) {
      try {
        const coord = await fetchCoordinates(cityName);
        setCoordinates(coord);
      } catch (error) {
        console.error("도시 정보를 찾을 수 없습니다.", error);
      }
    }
  };

  return (
    <SearchLocationStyle>
      <div>지역 검색</div>
      <InputText value={cityName} onChange={handleInputChange} />
      <Button onClick={handleSearch}>검색</Button>
      {coordinates && (
        <>
          <CurrentWeather lat={coordinates.lat} lon={coordinates.lon} />
          <Forecast lat={coordinates.lat} lon={coordinates.lon} />
        </>
      )}
    </SearchLocationStyle>
  );
}

const SearchLocationStyle = styled.div`
  display: flex;
  padding: 40px;
  text-align: center;
  align-items: center;
  gap: 40px;
`;

export default SearchLocation;
