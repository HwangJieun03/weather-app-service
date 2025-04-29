import styled from "styled-components"

export const CurrentWeatherStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const WeatherInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  max-width: 600px;
  padding: 10px;

  .temp {
    font-weight: bold;
  }
`;