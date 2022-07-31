import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
class HomeHeader extends Component {

    render() {

        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fa fa-bars"></i>
                            <div className="header-logo">
                            </div>
                        </div>
                        <div className="center-content">
                            <button className="child-content">
                                <div><FormattedMessage id="home-header.specialist"/></div>
                                <span><FormattedMessage id="home-header.find-doctor"/></span>
                            </button>
                            <button className="child-content">
                                <div><FormattedMessage id="home-header.health-facilities"/></div>
                                <span><FormattedMessage id="home-header.choose-hospital-clinic"/></span>
                            </button>
                            <button className="child-content">
                                <div><FormattedMessage id="home-header.doctor"/></div>
                                <span><FormattedMessage id="home-header.good-doctor"/></span>
                            </button>
                            <button className="child-content">
                                <div><FormattedMessage id="home-header.checkup"/></div>
                                <span><FormattedMessage id="home-header.general-health-check"/></span>
                            </button>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fa fa-question-circle"></i>
                                <FormattedMessage id="home-header.support"/>
                            </div>
                            <div className="flag">
                                <div className="language-vi">
                                    VN
                                </div>
                                <div className="language-en">
                                    EN
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="banner-top">
                        <div className="bn-title">
                            <h1>
                                Nền tảng y tế 
                            </h1>
                            <h1><b>chăm sóc sức khỏe toàn diện</b></h1>
                        </div>
                        <div className="banner-search">
                            <div className="search">
                                <i className="fa fa-search"></i>
                                <input type="search" placeholder='Tìm chuyên khoa'/>
                            </div>
                        </div>
                    </div>
                    <div className="banner-options">
                        <ul>
                            <li>
                                <div className="children">
                                    <i className="fa fa-hospital"></i>
                                    <div className="text-child">
                                        Khám chuyên khoa
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="children">
                                    <i className="fa fa-mobile-alt"></i>
                                    <div className="text-child">
                                        Khám từ xa
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="children">
                                    <i className="fa fa-procedures"></i>
                                    <div className="text-child">
                                        Khám tổng quát
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="children">
                                    <i className="fas fa-vial"></i>
                                    <div className="text-child">
                                        Xét nghiệm y học
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="children">
                                    <i className="fa fa-user-md"></i>
                                    <div className="text-child">
                                        Sức khỏe tinh thần
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="children">
                                    <i className="fas fa-diagnoses"></i>
                                    <div className="text-child">
                                        Khám nha khoa
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="children">
                                    <i className="fas fa-notes-medical"></i>
                                    <div className="text-child">
                                        Gói phẩu thuật
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="children">
                                    <i className="fas fa-truck-moving"></i>
                                    <div className="text-child">
                                        Sản phẩm y tế
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="children">
                                   <i className="fas fa-user-plus"></i>
                                    <div className="text-child">
                                        Sức khỏe Doanh nghiệm
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
