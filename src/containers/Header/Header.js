import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
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
        const { processLogout } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className="languages">
                    <span 
                        className={this.props.language === LANGUAGES.VI?"language-vi active": "language-vi"}
                        onClick={()=>this.changeLanguage(LANGUAGES.VI)}
                    >VN</span>
                    <span className={this.props.language === LANGUAGES.EN?"language-en active": "language-en"}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        onChangeLanguage: (language)=>(dispatch(setChangeLanguage(language)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
