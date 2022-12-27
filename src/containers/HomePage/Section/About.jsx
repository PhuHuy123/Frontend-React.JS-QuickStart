import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { useMediaQuery } from "react-responsive";

const Specialty = () => {
  const isMobi = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="section section-about">
      <div className={isMobi ? "section-content-mobi" : "section-content"}>
        <div className="section-header">
          <span>
            <FormattedMessage id="homepage.guide" />
          </span>
        </div>
        <div className="about-middle">
          <iframe
            width={isMobi ? "100%" : "59%"}
            height="100%"
            src="https://www.youtube.com/embed/6VVH21RBWdc"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          {!isMobi && (
            <span>
              <FormattedMessage id="homepage.g1" />
              <ul>
                <li>
                  <FormattedMessage id="homepage.g2" />
                </li>
                <li>
                  <FormattedMessage id="homepage.g3" />
                </li>
                <li>
                  <FormattedMessage id="homepage.g4" />
                </li>
              </ul>
            </span>
          )}
        </div>
        <div className="about-right"></div>
      </div>
    </div>
  );
};

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
