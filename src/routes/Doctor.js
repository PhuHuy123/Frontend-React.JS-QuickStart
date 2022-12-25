import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import Header from '../containers/Header/Header';
import ManagePatient from '../containers/System/Doctor/ManagePatient';
import {USER_ROLE} from '../utils';
import Statistical from '../containers/System/Statistical/Statistical';

class Doctor extends Component {
    render() {
        const { isLoggedIn, userInfo } = this.props;
        console.log("userInfo", userInfo)
        return (
            <>
                {isLoggedIn && <Header />}
                {(userInfo.roleId  === USER_ROLE.DOCTOR || userInfo.roleId  === USER_ROLE.ADMIN) &&
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                            <Route path="/doctor/manage-patient" component={ManagePatient} /> 
                            <Route path="/doctor/system/dashboard" component={Statistical} />                     
                        </Switch>
                    </div>
                </div>
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
