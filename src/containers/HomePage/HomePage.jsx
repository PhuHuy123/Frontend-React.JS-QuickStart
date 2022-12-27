import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import OutstandingDoctor from "./Section/OutstandingDoctor";
import Handbook from "./Section/Handbook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive";

const HomePage = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 991px)" });
  const isMobi = useMediaQuery({ query: "(max-width: 768px)" });
  const isIphone = useMediaQuery({ query: "(max-width: 555px)" });
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: isTablet ? (isMobi ? (isIphone ? 1 : 2) : 3) : 4,
    slidesToScroll: 1,
  };
  return (
    <div>
      <HomeHeader isShowBanner={true} />
      <Specialty settings={settings} />
      <MedicalFacility settings={settings} />
      <OutstandingDoctor settings={settings} />
      <Handbook settings={settings} />
      <About />
      <HomeFooter />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
