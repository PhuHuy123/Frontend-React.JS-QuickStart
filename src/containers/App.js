import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

import System from '../routes/System';
import HomePage from './HomePage/HomePage';
import DetailDoctor from './Patient/Doctor/DetailDoctor';
import VerifyEmail from './Patient/VerifyEmail';
import NewPassword from './../containers/Auth/NewPassword';
import ResetPassword from './../containers/Auth/ResetPassword';
import { CustomToastCloseButton } from '../components/CustomToast';
import CustomScrollbars from '../components/CustomScrollbars';
import Doctor from '../routes/Doctor';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';
import DetailClinic from './Patient/Clinic/DetailClinic';
import DetailPosts from './Patient/Posts/DetailPosts';
import HighChart from './HighCharts/HighChart';
import InfoPatient from './Information/InfoPatient';
import Paypal from './Paypal/Paypal';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">

                        <div className="content-container">
                            <CustomScrollbars style={{height: "100vh", with: "100%"}}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SIGNUP} component={userIsNotAuthenticated(Signup)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_DOCTOR}component={DetailDoctor}/>
                                    <Route path={path.DETAIL_SPECIALTY}component={DetailSpecialty}/>
                                    <Route path={path.DETAIL_CLINIC}component={DetailClinic}/>
                                    <Route path={path.DETAIL_POSTS}component={DetailPosts}/>
                                    <Route path={path.VERIFY_EMAIL_BOOKING}component={VerifyEmail}/>
                                    <Route path={path.EMAIL_UPDATE_PASSWORD}component={NewPassword}/>
                                    <Route path={path.INPUT_EMAIL_RESET}component={ResetPassword}/>
                                    <Route path={path.COVID_19}component={HighChart}/>
                                    <Route path={path.INFO_PATIENT} component={userIsAuthenticated(InfoPatient)}/>
                                    <Route path={path.PAYPAL}component={Paypal}/>
                                </Switch>
                            </CustomScrollbars>
                        </div>

                        <ToastContainer
                            position="top-right"
                            autoClose={1500}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            toastStyle={{ backgroundColor: "crimson" }}
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
