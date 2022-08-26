import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import {getProfileDoctorById} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import _ from 'lodash';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        }
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }
    getInfoDoctor = async(id)=>{
        let result = {}
        if(id){
            let res = await getProfileDoctorById(id);
            if(res && res.errCode === 0){
                result = res.data;
            }
        }
        return result;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
        }
        if(this.props.doctorId !== prevProps.doctorId){
            // this.getInfoDoctor(this.props.doctorId)
        }
    }
    renderTimeBooking = (dataTime)=>{
        if(dataTime && !_.isEmpty(dataTime)){
            let {language} = this.props
            let date = language === LANGUAGES.EN ? 
                moment(new Date(dataTime.date)).locale('en').format('dddd - MM/DD/YYYY') :
                moment(new Date(dataTime.date)).format('dddd - DD/MM/YYYY');
            let time = language === LANGUAGES.EN ? 
                dataTime.timeTypeData.valueEn : dataTime.timeTypeData.valueVi;
            return (<>
                <div className="render-date">{date}</div>
                <div>{time}</div>
            </>
            )
        }
        return <></>
    }
    render() {
        let {language, isShowMarkdown, dataTime} = this.props;
        let {dataProfile} = this.state;
        let nameVi='', nameEn= '';
        if(dataProfile && dataProfile.positionData){
            nameVi = `${dataProfile.positionData.valueVi} || ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn} || ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        return (
            <>
                <div className="info-doctor">
                    <div className="content-left"
                        style={{backgroundImage:`url('${dataProfile && dataProfile.image?dataProfile.image:''}')`}}
                    ></div>
                    <div className="content-right">
                        <div className="up">{language === LANGUAGES.VI? nameVi:nameEn}</div>
                        {isShowMarkdown === true ?
                            <div className="down">
                                {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description 
                                    && dataProfile.Markdown.description 
                                    && <span>{dataProfile.Markdown.description}</span>
                                }
                            </div>
                            : <>{this.renderTimeBooking(dataTime)}</>
                        }
                    </div>
                </div>
                <div className="price">
                    <FormattedMessage id="patient.booking-modal.price"/> 
                    {dataProfile && dataProfile.DoctorInfo && language === LANGUAGES.VI ?
                        <NumberFormat 
                            className='currency'
                            value={dataProfile.DoctorInfo.priceTypeData.valueVi} 
                            displayType={'text'}
                            thousandSeparator = {true}
                            suffix={'VNĐ'}
                        />
                        : ''
                    }
                    {dataProfile && dataProfile.DoctorInfo && language === LANGUAGES.EN ?
                        <NumberFormat 
                            className='currency'
                            value={dataProfile.DoctorInfo.priceTypeData.valueEn} 
                            displayType={'text'}
                            thousandSeparator = {true}
                            suffix={'$'}
                        />
                        : ''
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
