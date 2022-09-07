import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import {postBookAppointment} from '../../../../services/userService';
import {LANGUAGES} from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import {Modal} from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import * as actions from '../../../../store/actions';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMarkdown: false,
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',

            isShowLoading: false
        }
    }

    async componentDidMount() {
       this.props.getGenders();
    }
    buildDataGender = (data) => {
        let result = [];
        let {language} = this.props;
        if(data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn ;
                object.value = item.keyMap ;
                result.push(object);
            })
        }
        return result;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if(this.props.genders !== prevProps.genders){
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if(this.props.dataTime !== prevProps.dataTime){
            if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }
    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let copyState = {...this.state};
        copyState[id] = valueInput;
        this.setState({
            ...copyState
        })
    }
    handleOnchangeDatePicker = (date)=>{
        this.setState({
            birthday: date
        })
    }
    handleChangeSelect = (selectedOption)=>{
        this.setState({
            selectedGender: selectedOption
        })
    }
    buildTimeBooking = (dataTime)=>{
        if(dataTime && !_.isEmpty(dataTime)){
            let {language} = this.props
            let date = language === LANGUAGES.EN ? 
                moment(new Date(dataTime.date)).locale('en').format('dddd - MM/DD/YYYY') :
                moment(new Date(dataTime.date)).format('dddd - DD/MM/YYYY');
            let time = language === LANGUAGES.EN ? 
                dataTime.timeTypeData.valueEn : dataTime.timeTypeData.valueVi;
            return `${time}  ${date}`
        }
        return ``
    }
    buildDoctorName = (dataTime)=>{
        if(dataTime && !_.isEmpty(dataTime)){
            let {language} = this.props
            let name = language === LANGUAGES.EN ? 
                `${dataTime.doctorData.firstName} - ${dataTime.doctorData.lastName}`:
                `${dataTime.doctorData.lastName} - ${dataTime.doctorData.firstName}`;

            return name
        }
        return ``
    }
    handleConfirmBooking =  async() => {
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        this.setState({isShowLoading: true});
        let res = await postBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })
        if(res && res.errCode ===0){
            this.setState({isShowLoading: false});
            toast.success('Booking a new appointment succeed!')
            this.props.closeBooking();
        }else{
            this.setState({isShowLoading: false});
            toast.error('Booking a new appointment error!')
        }
    }
    render() {
        let {language} = this.props;
        // toggle cha
        let {isOpenModal, closeBooking, dataTime} = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ?  dataTime.doctorId : '';
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <Modal 
                        isOpen={isOpenModal}
                        className={'booking-modal-container'}
                        size = "lg"
                        centered
                        // backdrop={true}
                    >
                        <div className="booking-modal-content">
                            <div className="booking-modal-header">
                                <span className="left"><FormattedMessage id="patient.booking-modal.title"/></span>
                                <span className="right" onClick={closeBooking}>
                                    <i className="fas fa-times"></i>
                                </span>
                            </div>
                            <div className="booking-modal-body">
                                {/* {JSON.stringify(dataTime)} */}
                                <div className="doctor-info">
                                    <ProfileDoctor doctorId ={doctorId}
                                        dataTime ={dataTime}
                                        isShowMarkdown = {this.state.isShowMarkdown}
                                        isShowLinkDetail = {false}
                                        isShowPrice = {true}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.fullName"/></label>
                                        <input className='form-control'
                                            value={this.state.fullName}
                                            onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.phoneNumber"/></label>
                                        <input className='form-control'
                                            value={this.state.phoneNumber}
                                            onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.email"/></label>
                                        <input className='form-control'
                                            value={this.state.email}
                                            onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.address"/></label>
                                        <input className='form-control'
                                            value={this.state.address}
                                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                        />
                                    </div>
                                    <div className="col-12 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.reason"/></label>
                                        <input className='form-control'
                                            value={this.state.reason}
                                            onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.birthday"/></label>
                                        <DatePicker
                                            className ="form-control"
                                            dateFormat = {language === LANGUAGES.VI? "dd/MM/yyyy":"MM/dd/yyyy"}
                                            selected={this.state.birthday} 
                                            onChange={(date)=>this.handleOnchangeDatePicker(date)}
                                            value={this.state.birthday===''?language === LANGUAGES.VI? '-- Chọn ngày --':'-- Choose a date --':false}
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.gender"/></label>
                                        <Select
                                            value={this.state.selectedGender}
                                            onChange={this.handleChangeSelect}
                                            options={this.state.genders}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='booking-modal-footer'>
                                <button className='btn-booking-confirm' 
                                    onClick={()=>this.handleConfirmBooking()}
                                ><FormattedMessage id="patient.booking-modal.btnConfirm"/></button>
                                <button className='btn-booking-cancel' 
                                    onClick={closeBooking}
                                ><FormattedMessage id="patient.booking-modal.btnCancel"/></button>
                            </div>
                        </div>
                    </Modal>
                </LoadingOverlay>
            </>
                
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
