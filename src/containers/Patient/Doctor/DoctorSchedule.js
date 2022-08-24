import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import {getScheduleDoctorByDate} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal'
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays:[],
            allAvailableTime:[],
            isOpenModalBooking:false,
            dataScheduleTimeModal:{},
        }
    }

    async componentDidMount() {
        let {language} = this.props
        let allDays = this.getArrDate(language);
        this.setState({
            allDays: allDays
        })
    }
    getArrDate = (language)=>{
        let allDays= []
        for(let i = 0; i < 7; i++) {
            let object = {};
            if(language === LANGUAGES.EN){
                if(i === 0){
                    object.label = `Today ${moment(new Date()).locale('en').format('DD/MM')}`
                }
                else object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM')
            }
            else{
                if(i === 0){
                    object.label = `Hôm nay ${moment(new Date()).format('DD/MM')}`
                }
                else object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
            let allDays = this.getArrDate(this.props.language)
            this.setState({ allDays: allDays })
        }
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
            let allDays = this.getArrDate(this.props.language);
            let dt = new Date(+(allDays[0].value))
            let date = moment(dt).format('YYYY-MM-DD')
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, date);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }
    handlerOnChangeSelect= async(e)=>{
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1){
            let doctorId = this.props.doctorIdFromParent;
            let dt = new Date(+(e.target.value))
            let date = moment(dt).format('YYYY-MM-DD')
            let res = await getScheduleDoctorByDate(doctorId, date);
            if(res && res.errCode === 0){
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
            console.log("res: ",res);

        }
    }
    handleClickScheduleTime = (time)=>{
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time,
        })
        console.log("time: ",time);
    }
    closeBooking = ()=>{
        this.setState({
            isOpenModalBooking: false,
        })
    }
    render() {
        let {allDays, allAvailableTime, isOpenModalBooking,dataScheduleTimeModal} = this.state;
        let {language} = this.props;
        // console.log("res: ",this.state.allAvailableTime);
        return (
            <>
                <div className="doctor-schedule-container">
                    <div className= "all-schedule">
                        <select onChange={(e)=>this.handlerOnChangeSelect(e)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index)=>{
                                    return (
                                        <option
                                            key={index} value={item.value}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className= "all-available-time">
                        <div className= "text-calendar">
                            <i className="fa fa-calendar-alt"><span><FormattedMessage id="patient.detail-doctor.schedule"/></span></i>
                        </div>
                        <div className= "time-content">
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                allAvailableTime.map((item, index)=>{
                                    let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi:item.timeTypeData.valueEn;
                                    return (
                                        <button key={index} className={language === LANGUAGES.VI ?"btn-time-vi":"btn-time-en"}
                                            onClick={()=>this.handleClickScheduleTime(item)}
                                        >
                                            {timeDisplay}
                                        </button>
                                    )
                                })
                                :
                                <div className="attention">
                                    <FormattedMessage id="patient.detail-doctor.no-schedule"/>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal 
                    isOpenModal = {isOpenModalBooking}
                    closeBooking = {this.closeBooking}
                    dataTime = {dataScheduleTimeModal}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
