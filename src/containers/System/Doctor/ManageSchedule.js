import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES, dateFormat} from '../../../utils';
import Select from 'react-select';
import * as actions from '../../../store/actions';
// import DatePicker from '../../../components/Input/DatePicker';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import {bulkCreateSchedule} from'../../../services/userService'
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: {},
            listDoctors:'',
            startDate: '',
            rangeTime:[],
        }
    }
    componentDidMount() {
        this.props.fetAllDoctorsRedux();
        this.props.fetchAllScheduleTime();
    }
    handleChange = async(selectedDoctor)=> {
        this.setState({ selectedDoctor })
    };
    buildDataInputSelect = (inputData) => {
        let result = [];
        let {language}= this.props;
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
                let object = {};
                let valueVi = `${item.lastName} ${item.firstName}`;
                let valueEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI? valueVi : valueEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.arrDoctors!==this.props.arrDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.arrDoctors)
            this.setState({
                listDoctors:dataSelect,
            })
        }
        if(prevProps.allScheduleTimes!==this.props.allScheduleTimes){
            let data = this.props.allScheduleTimes;
            if(data && data.length > 0){
                data = data.map(item =>({
                    ...item,
                    isSelected: false
                }))
            }
            this.setState({
                rangeTime:data,
            })
        }
        if(prevProps.language!==this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.arrDoctors)
            this.setState({
                listDoctors:dataSelect,
            })
        }
    }
    handleDateChange = async(date)=>{
        this.setState({startDate:date})
    }
    handleClickTime = (time)=>{
        let {rangeTime} = this.state
        if(rangeTime && rangeTime.length>0){
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id){
                     item.isSelected= !time.isSelected;  
                }
                return item;
            })
            this.setState({rangeTime})
        }
    }
    handleSaveSchedule = async()=>{
        let {rangeTime, selectedDoctor, startDate} = this.state;
        let result = [];
        // let formatData =  moment(startDate).format(dateFormat.SEND_TO_SERVER)
        let formatData = new Date(startDate).getTime();
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error('Invalid choose doctor !');
            return;
        }
        if(!startDate){
            toast.error('Invalid start date!');
            return;
        }
        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected===true);
            if(selectedTime && selectedTime.length>0){
                selectedTime.map(item => {
                    let object ={};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatData;
                    object.timeType = item.keyMap;
                    result.push(object);
                })
            }
            else{
                toast.error('Invalid time has not been selected!');
                return;

            }
        }
        let res = await bulkCreateSchedule({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatData: formatData
        });
    }
    render() {
        let {language} = this.props
        let {rangeTime} = this.state
        return (
            <div className="manage-schedule-container">
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title"/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <label><FormattedMessage id="manage-schedule.choose-doctor"/></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className="col-6">
                            <label><FormattedMessage id="manage-schedule.choose-date"/></label>
                            <DatePicker 
                                className ="form-control"
                                dateFormat = {language === LANGUAGES.VI? "dd/MM/yyyy":"MM/dd/yyyy"}
                                selected={this.state.startDate} 
                                onChange={(date) => this.handleDateChange(date)}
                                minDate = {new Date()}
                                value={this.state.startDate===''?language === LANGUAGES.VI? '-- Chọn ngày --':'-- Choose a date --':false}
                            />
                        </div>
                        <div className="col-12 pick-hour">
                            {rangeTime && rangeTime.length>0 &&
                                rangeTime.map((item, index)=>{
                                    return <button key={index}
                                                className={item.isSelected === true? 'btn btn-warning m-2 p-2':'btn m-2 p-2'}
                                                onClick={()=>this.handleClickTime(item)}
                                            >
                                                {language === LANGUAGES.VI? item.valueVi:item.valueEn}
                                           </button>
                                })
                            }
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary"
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id="manage-schedule.save-info"/>
                            </button>
                        </div>
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
        arrDoctors: state.admin.allDoctors,
        allScheduleTimes: state.admin.allScheduleTimes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
