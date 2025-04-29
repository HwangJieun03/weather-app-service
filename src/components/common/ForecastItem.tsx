interface ForecastItemProps {
    date: string;
    dayOfWeek: string;
    minTemp: number;
    maxTemp: number;
    weatherDescription: string;
  }
  
  function ForecastItem({ date, dayOfWeek, minTemp, maxTemp, weatherDescription }: ForecastItemProps) {
    return (
      <div className="forecast-item">
        {/* <p>{date}</p> */}
        <div>{date} {dayOfWeek}요일</div>
        <p>최고 기온: {maxTemp} °C</p>
        <p>최저 기온: {minTemp} °C</p>
        <p>날씨: {weatherDescription}</p>
      </div>
    );
  }
  
  export default ForecastItem;
  