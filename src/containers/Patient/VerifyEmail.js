import React, { Component } from 'react';
import { connect } from "react-redux";
import './VerifyEmail.scss';
import {postVerifyBookAppointment} from '../../services/userService';
import {LANGUAGES} from '../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../HomePage/HomeHeader';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
       if(this.props.location && this.props.location.search){
        let url = new URLSearchParams(this.props.location.search);
        let token = url.get('token');
        let timeType = url.get('timeType');
        let date = url.get('date');
        let reason = url.get('reason');
        let doctorId = url.get('doctorId');
        let bookingId = url.get('bookingId');
        let res = await postVerifyBookAppointment({
            token: token,
            doctorId: doctorId,
            bookingId: bookingId,
            timeType: timeType,
            date: date,
            reason: reason,
        })
        if(res && res.errCode === 0){
            this.setState({
                statusVerify: true,
                errCode: res.errCode
            })
        }
        else {
            this.setState({
                statusVerify: true,
                errCode: res && res.errCode ? res.errCode : -1
            })
        }
       }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
        }
    }

    render() {
        let {language} = this.props;
        let {statusVerify, errCode} = this.state;
        return (
            <>
                <HomeHeader/>
                <div className="verify-email-container">
                    {statusVerify === false ?
                        <h3><FormattedMessage id="patient.verify-email.loading" /></h3>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className='notification success'><FormattedMessage id="patient.verify-email.success" /></div>
                                :
                                <div className='notification fail'><FormattedMessage id="patient.verify-email.fail" /></div>
                            }
                        </div>
                    }
                </div>
            </>
                
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
