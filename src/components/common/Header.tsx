import styled from "styled-components";
import CurrentWeather from "./CurrentWeather";

interface HeaderProps {
    coordinates: { lat: number; lon: number };
    onCoordinatesChange: (coordinates: { lat: number; lon: number }) => void;
  }

function Header({ coordinates, onCoordinatesChange }: HeaderProps) {
    return (
      <HeaderStyle>
        <h1>날씨 앱</h1>
        <CurrentWeather 
          lat={coordinates.lat} 
          lon={coordinates.lon} 
          onCoordinatesChange={onCoordinatesChange} 
        />
      </HeaderStyle>
    );
  }

const HeaderStyle = styled.div``;

export default Header;

