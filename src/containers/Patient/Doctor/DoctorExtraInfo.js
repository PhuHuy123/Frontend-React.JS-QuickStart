import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss';
import {getExtraInfoDoctorById} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            extraInfo: {},
        }
    }

    async componentDidMount() {
        if(this.props.doctorIdFromParent){
            let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent);
            if(res && res.errCode === 0){
                this.setState({
                    extraInfo: res.data
                })
            }
        }
       
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
        }
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
            let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent);
            if(res && res.errCode === 0){
                this.setState({
                    extraInfo: res.data
                })
            }
        }
    }
    showDetailInfo = (show) =>{
        this.setState({ isShowDetailInfo: show })
    }
    render() {
        let {language} = this.props;
        let {isShowDetailInfo, extraInfo} = this.state
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address"><FormattedMessage id="patient.extra-info-doctor.text-address"/></div>
                    <div className="name-clinic">
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                    </div>
                    <div className="detail-address">
                        {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                    </div>
                </div>
                <div className="content-down">
                    {
                        isShowDetailInfo === false && 
                        <div className="short-info">
                            <FormattedMessage id="patient.extra-info-doctor.price"/>
                            {extraInfo  && extraInfo.priceTypeData && language === LANGUAGES.VI ?
                                <NumberFormat 
                                    className='currency'
                                    value={extraInfo.priceTypeData.valueVi} 
                                    displayType={'text'}
                                    thousandSeparator = {true}
                                    suffix={'VNĐ'}
                                />
                                : ''
                            }
                            {extraInfo  && extraInfo.priceTypeData && language === LANGUAGES.EN ?
                                <NumberFormat 
                                    className='currency'
                                    value={extraInfo.priceTypeData.valueEn} 
                                    displayType={'text'}
                                    thousandSeparator = {true}
                                    suffix={'$'}
                                />
                                : ''
                            }
                            <span className='detail' onClick={()=>this.showDetailInfo(true)}><FormattedMessage id="patient.extra-info-doctor.detail"/></span>
                        </div>
                    }
                    {
                       isShowDetailInfo === true && 
                       <>
                            <div className="title-price">
                                <FormattedMessage id="patient.extra-info-doctor.price"/>
                                </div>
                            <div className="detail-info">
                                <div className="price">
                                    <span className='left'>
                                        <FormattedMessage id="patient.extra-info-doctor.price"/>
                                    </span>
                                    <span className='right'>
                                    {extraInfo  && extraInfo.priceTypeData && language === LANGUAGES.VI ?
                                        <NumberFormat 
                                            className='currency'
                                            value={extraInfo.priceTypeData.valueVi} 
                                            displayType={'text'}
                                            thousandSeparator = {true}
                                            suffix={'VNĐ'}
                                        />
                                        : ''
                                    }
                                    {extraInfo  && extraInfo.priceTypeData && language === LANGUAGES.EN ?
                                        <NumberFormat 
                                            className='currency'
                                            value={extraInfo.priceTypeData.valueEn} 
                                            displayType={'text'}
                                            thousandSeparator = {true}
                                            suffix={'$'}
                                        />
                                        : ''
                                    }
                                    </span>
                                </div>
                                <div className="note">
                                {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                </div>
                            </div>
                            <div className="payment">
                                <FormattedMessage id="patient.extra-info-doctor.payment"/>
                                {extraInfo && extraInfo.provinceTypeData && language === LANGUAGES.VI ? 
                                    extraInfo.provinceTypeData.valueVi: ''}
                                {extraInfo && extraInfo.provinceTypeData && language === LANGUAGES.EN ? 
                                    extraInfo.provinceTypeData.valueEn: ''}
                            </div>
                            <div className="hide-price">
                                <span onClick={()=>this.showDetailInfo(false)}><FormattedMessage id="patient.extra-info-doctor.hide-price"/></span>
                            </div> 
                       </>
                    }
                </div>
            </div>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
