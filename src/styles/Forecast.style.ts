import styled from 'styled-components';

export const ForecastStyle = styled.div`
  padding: 20px;
  text-align: center;

  .forecast-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .forecast-item {
    background-color: #f0f0f0;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    border: 1px solid #ddd;
  }

  div {
    margin-bottom: 20px;
  }
`;
