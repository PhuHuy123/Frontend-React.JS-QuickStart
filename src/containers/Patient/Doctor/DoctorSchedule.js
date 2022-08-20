import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import {getScheduleDoctorByDate} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays:[],
            allAvailableTime:[],
        }
    }

    async componentDidMount() {
        let {language} = this.props
        this.setArrDate(language)
    }
    setArrDate = (language)=>{
        let allDays= []
        for(let i = 0; i < 7; i++) {
            let object = {};
            if(language === LANGUAGES.EN){
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM')
            }
            else{
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        this.setState({
            allDays: allDays,
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
            this.setArrDate(this.props.language)
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
    render() {
        let {allDays, allAvailableTime} = this.state;
        let {language} = this.props;
        console.log("res: ",this.state.allAvailableTime);
        return (
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
                        <i className="fa fa-calendar-alt"><span>Lịch khám</span></i>
                    </div>
                    <div className= "time-content">
                        {allAvailableTime && allAvailableTime.length > 0 ?
                            allAvailableTime.map((item, index)=>{
                                let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi:item.timeTypeData.valueEn;
                                return (
                                    <button key={index} className={language === LANGUAGES.VI ?"btn-time-vi":"btn-time-en"}>
                                        {timeDisplay}
                                    </button>
                                )
                            })
                            :
                            <div className="attention">
                                Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác!
                            </div>
                        }
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
