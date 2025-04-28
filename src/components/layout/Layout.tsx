import styled from "styled-components";
//import Footer from "../common/Footer";
import Header from "../common/Header";
import AirStatus from "../common/AirStatus";
import SearchLocation from "../common/SearchLocation";
import Forecast from "../common/Forecast";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <LayoutStyle>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
      <AirStatus />
      <SearchLocation />
      <Forecast />
    </LayoutStyle>
  );
}

const LayoutStyle = styled.main`
  width: 100%;
  margin: 0 auto; 
  padding : 20px 0;
`;

export default Layout;
