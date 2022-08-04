import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { FormattedMessage } from 'react-intl';
import { adminMenu } from './menuApp';
import './Header.scss';
import {LANGUAGES} from '../../utils';
import {setChangeLanguage} from '../../store/actions'

class Header extends Component {
    changeLanguage = (language)=>{{
        this.props.onChangeLanguage(language)
        }
    }
    render() {
        const { processLogout ,userInfo,language} = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
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
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
