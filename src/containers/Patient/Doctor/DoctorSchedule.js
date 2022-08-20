import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import {getScheduleDoctorByDate} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi'

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays:[],
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
            console.log("res: ",res);
        }
    }
    render() {
        let {allDays} = this.state
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
