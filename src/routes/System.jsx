import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import Header from '../containers/Header/Header';
import ManageSpecialty from '../containers/System/Specialty';
import AddSpecialty from '../containers/System/Specialty/ManageSpecialty';
import Clinic from '../containers/System/Clinic';
import AddClinic from '../containers/System/Clinic/ManageClinic';
import ManagePosts from '../containers/System/Posts';
import AddPost from '../containers/System/Posts/ManagePosts';
import Statistical from '../containers/System/Statistical/Statistical';
import Info from '../containers/System/Info';
import {USER_ROLE} from '../utils';
class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn, userInfo } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                {userInfo.roleId  === USER_ROLE.ADMIN &&
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={ManageDoctor} />
                            <Route path="/system/manage-specialty" component={ManageSpecialty} />
                            <Route path="/system/add-specialty" component={AddSpecialty} />
                            <Route path="/system/manage-clinic" component={Clinic} />
                            <Route path="/system/add-clinic" component={AddClinic} />
                            <Route path="/system/manage-posts" component={ManagePosts} />
                            <Route path="/system/add-post" component={AddPost} />
                            <Route path="/system/dashboard" component={Statistical} />                  
                            <Route path="/system/info-patient" component={Info} />                  
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
