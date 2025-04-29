import InputText from "./InputText";
import Button from "./Button";
import { useState } from "react";
import { fetchCoordinates } from "../../api/geocoding";
import { SearchLocationStyle } from "../../styles/SearchLocation.style";

interface SearchLocationProps {
    onCoordinatesChange: (coordinates: { lat: number; lon: number }) => void;
  }

function SearchLocation({ onCoordinatesChange }: SearchLocationProps){
  const [cityName, setCityName] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleSearch = async () => {
    if (cityName.trim()) {
      try {
        const coord = await fetchCoordinates(cityName);
        onCoordinatesChange({ lat: coord.lat, lon: coord.lon });
        setCityName("");
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

    </SearchLocationStyle>
  );
}



export default SearchLocation;
