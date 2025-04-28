import styled from "styled-components";
import CurrentWeather from "./CurrentWeather";

function Header() {
    return (  
        <HeaderStyle>
            <h1>날씨 앱</h1>
            <CurrentWeather />
        </HeaderStyle>
    );
};

const HeaderStyle = styled.div``;

export default Header;