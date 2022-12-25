import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import logo from "../../assets/images/logo-svg.png";
import iconMail from "../../assets/images/icons/mail.webp";
import iconPhone from "../../assets/images/icons/phone-call.webp";
import iconMap from "../../assets/images/icons/map.webp";
import "./Footer.scss";
import { Link } from "react-router-dom";

class Specialty extends Component {
  render() {
    return (
      <footer className="rs-footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-3 footer-widget">
                <h4 className="widget-title">
                <FormattedMessage id="footer.row1" />
                </h4>
                <ul className="site-map site-one white-color">
                  <li>
                  <FormattedMessage id="footer.content1" />
                  </li>
                </ul>
              </div>
              <div className="col-3 footer-widget">
                <h4 className="widget-title"><FormattedMessage id="footer.row2" /></h4>
                <ul className="site-map site-two">
                  <li><FormattedMessage id="footer.criteria1" /></li>
                  <li><FormattedMessage id="footer.criteria2" /></li>
                  <li><FormattedMessage id="footer.criteria3" /></li>
                </ul>
              </div>
              <div className="col-3 footer-widget">
                <h4 className="widget-title"><FormattedMessage id="footer.row3" /></h4>
                <ul className="site-map site-three">
                  <li>
                    <Link to="all-specialty">
                      <FormattedMessage id="home-header.specialist" />
                    </Link>
                  </li>
                  <li>
                    <Link to="all-clinic">
                      <FormattedMessage id="home-header.health-facilities" />
                    </Link>
                  </li>
                  <li>
                    <Link to="all-doctor">
                      <FormattedMessage id="home-header.doctor" />
                    </Link>
                  </li>
                  <li>
                    <Link to="all-posts">
                      <FormattedMessage id="home-header.posts" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-3 footer-widget">
                <h4 className="widget-title"><FormattedMessage id="footer.row4" /></h4>
                <ul className="address-widget">
                  <li>
                    <div>
                      <img src={iconMap} alt="map" />
                    </div>
                    <div className="desc">
                      368 Đường Trần Hưng Đạo, An Hải, An Hải Tây, Sơn Trà, Đà
                      Nẵng
                    </div>
                  </li>
                  <li>
                    <div>
                      <img src={iconPhone} alt="phone" />
                    </div>
                    <div className="desc">
                      <a href="tel:0368492885">(+84) 368499999</a>
                    </div>
                  </li>
                  <li>
                    <div>
                      <img src={iconMail} alt="mail" />
                    </div>
                    <div className="desc">
                      <a href="mailto:hello@stunited.vn">hope@hope.edu.vn</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row y-middle">
              <div className="col-lg-4">
                <div className="footer-logo md-text-center">
                  <Link to="/home" className="pointer-default">
                    <img alt="one" src={logo} />
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 mb-40">
                <div className="copyright text-center">
                  <p style={{ color: "white" }}>
                    &copy; Copyright 2022 Website Đặt lịch khám bệnh.{" "}
                  </p>
                </div>
              </div>
              <div className="col-lg-4 text-end">
                <ul className="footer-social">
                  <li>
                    <a
                      target="_blank"
                      href="https://www.facebook.com" rel="noreferrer"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>Facebook</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
