import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { FormattedMessage } from 'react-intl';
import { adminMenu , doctorMenu} from './menuApp';
import './Header.scss';
import {LANGUAGES, USER_ROLE} from '../../utils';
import {setChangeLanguage} from '../../store/actions'
import _ from 'lodash';
import HomePage from '../HomePage/HomePage';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        }
    }
    changeLanguage = (language)=>{{
        this.props.onChangeLanguage(language)
        }
    }
    componentDidMount(){
        let {userInfo} = this.props;
        let menu = [];
        // !_.isEmpty: check xem userInfo co rong k
        if (userInfo && !_.isEmpty(userInfo)){
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN){
                menu = adminMenu
            }
            else{
                if (role === USER_ROLE.DOCTOR){
                    menu = doctorMenu
                }
                else{
                    return this.setState({
                        menuApp:'',
                    })  
                }
            }
        }
            this.setState({
                menuApp:menu,
        })  
    }
    render() {
        const { processLogout ,userInfo,language} = this.props;
        return (
            <>
            { this.state.menuApp !== '' ?
            <div className="header-container">
            {/* thanh navigator */}
            <div className="header-tabs-container">
                <div className='dashboard'>
                    <Link to={userInfo.roleId=== USER_ROLE.ADMIN ?`/system/dashboard`:`/doctor/system/dashboard`}>
                        <i className="fa-solid fa-house-chimney"></i>
                        <b>Dashboard</b>
                    </Link>
                </div>
                <Navigator menus={this.state.menuApp} />
            </div>
            <div className="languages">
                <span className="welcome">
                    <FormattedMessage id="home-header.welcome"/>
                    {userInfo && userInfo.firstName?userInfo.firstName: ''}
                </span>
                <span 
                    className={language === LANGUAGES.VI?"language-vi active": "language-vi"}
                    onClick={()=>this.changeLanguage(LANGUAGES.VI)}
                >VN</span>
                <span className={language === LANGUAGES.EN?"language-en active": "language-en"}
                    onClick={()=>this.changeLanguage(LANGUAGES.EN)}
                >EN</span>
                {/* nút logout */}
                <div className="btn btn-logout" >
                    {/* <i className="fas fa-sign-out-alt"></i> */}
                    <label htmlFor="click-avatar">
                        <img alt="avarta" src={userInfo.image
                              ? userInfo.image
                              : "https://i.imgur.com/LntFpBn.png"}/>
                    </label>
                    <input
                        type="checkbox"
                        id="click-avatar"
                        hidden
                        className="click-avatar"
                    />
                    <div className="row nav-menu">
                    <div className="name-user col-12">
                      <div
                        style={{
                          backgroundImage: `url(${
                            userInfo.image
                              ? userInfo.image
                              : "https://i.imgur.com/LntFpBn.png"
                          })`,
                        }}
                        className="avatar"
                      ></div>
                      <span className="">
                        {userInfo && userInfo.firstName
                          ? userInfo.firstName
                          : ""}
                      </span>
                    </div>
                    <Link to={userInfo.roleId=== USER_ROLE.ADMIN ?"/system/info-patient":"/doctor/system/info-patient"}>
                      <div className="btn btn-logout">
                        <p>
                          <FormattedMessage id="navbar.personal-information" />
                        </p>
                      </div>
                    </Link>
                    <hr />
                    <div className="btn btn-logout" onClick={processLogout}>
                      <i className="fas fa-sign-out-alt"></i>
                      <p>
                        <FormattedMessage id="navbar.log-out" />
                      </p>
                    </div>
                  </div>
                </div>
            </div>
        </div>:
        <HomePage/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
