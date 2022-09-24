import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from '../../utils'
import {setChangeLanguage} from '../../store/actions'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
class HomeHeader extends Component {

    changeLanguage = (language)=>{
        this.props.onChangeLanguage(language)
        //fire redux event: actions
    }
    returnToHome =()=>{
        if(this.props.history){
            this.props.history.push(`/home`)
        }
    }
    render() {
        let {userInfo, processLogout} = this.props;
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fa fa-bars"></i>
                            <div className="header-logo" onClick={()=>this.returnToHome()}>
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
                                <Link to={`/high-chart/covid`} className="link-to">
                                    <div><FormattedMessage id="home-header.checkup"/></div>
                                    <span><FormattedMessage id="home-header.general-health-check"/></span>
                                </Link>
                            </button>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fa fa-question-circle"></i>
                                <FormattedMessage id="home-header.support"/>
                            </div>
                            <div className="flag">
                                <div className={this.props.language === LANGUAGES.VI?"language-vi active": "language-vi"}>
                                    <span onClick={()=>this.changeLanguage(LANGUAGES.VI)}>VN</span>
                                </div>
                                <div className={this.props.language === LANGUAGES.EN?"language-en active": "language-en"}>
                                    <span onClick={()=>this.changeLanguage(LANGUAGES.EN)}>EN</span> 
                                </div>
                            </div>
                            { userInfo ?
                                <>                                
                                    <span>{userInfo && userInfo.firstName?userInfo.firstName: ''}</span>
                                    <div className="btn btn-logout" onClick={processLogout}>
                                        <i className="fas fa-sign-out-alt"></i>
                                    </div>
                                </>
                                :
                                <>
                                    <Link to={`/login`} className="btn btn-warning ml-2">Login</Link>
                                    <Link to={`/signup`} className="btn btn-secondary ml-2">Sign up</Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className="home-header-banner">
                        <div className="banner-top">
                            <div className="bn-title">
                                <h1>
                                    <FormattedMessage id="home-header.bn-title1"/>
                                </h1>
                                <h1><b><FormattedMessage id="home-header.bn-title2"/></b></h1>
                            </div>
                            <div className="banner-search">
                                <div className="search">
                                    <i className="fa fa-search"></i>
                                    <input type="search" placeholder={this.props.language === LANGUAGES.EN?"Search": "Tìm kiếm"}/>
                                </div>
                            </div>
                        </div>
                        <div className="banner-options">
                            <ul>
                                <li>
                                    <div className="children">
                                        <i className="fa fa-hospital"></i>
                                        <div className="text-child">
                                            <FormattedMessage id="home-header.text-child1"/>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="children">
                                        <i className="fa fa-mobile-alt"></i>
                                        <div className="text-child">
                                            <FormattedMessage id="home-header.text-child2"/> 
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="children">
                                        <i className="fa fa-procedures"></i>
                                        <div className="text-child">
                                            <FormattedMessage id="home-header.text-child3"/> 
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="children">
                                        <i className="fas fa-vial"></i>
                                        <div className="text-child">
                                            <FormattedMessage id="home-header.text-child4"/> 
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="children">
                                        <i className="fa fa-user-md"></i>
                                        <div className="text-child">
                                            <FormattedMessage id="home-header.text-child5"/> 
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="children">
                                        <i className="fas fa-diagnoses"></i>
                                        <div className="text-child">
                                            <FormattedMessage id="home-header.text-child6"/> 
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="children">
                                        <i className="fas fa-notes-medical"></i>
                                        <div className="text-child">
                                            <FormattedMessage id="home-header.text-child7"/> 
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="children">
                                        <i className="fas fa-truck-moving"></i>
                                        <div className="text-child">
                                            <FormattedMessage id="home-header.text-child8"/> 
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="children">
                                    <i className="fas fa-user-plus"></i>
                                        <div className="text-child">
                                            <FormattedMessage id="home-header.text-child9"/> 
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        onChangeLanguage: (language)=>(dispatch(setChangeLanguage(language)))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
