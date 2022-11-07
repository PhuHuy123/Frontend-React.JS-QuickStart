import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
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
import {getAllPatientForDoctor, postSendRemedy} from'../../../services/userService'
import RemedyModal from './RemedyModal';
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }
    async componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async() =>{
        let {user} = this.props;
        let {startDate} = this.state;
        let formattedDate="ALL"
        if(startDate!==""){
            formattedDate = moment(startDate).format('YYYY-MM-DD')
        }
        let res = await getAllPatientForDoctor({
            doctorId: user.id, 
            date: formattedDate
        })
        console.log(res)
        if(res && res.errCode ===0){
            this.setState({dataPatient: res.data});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.startDate!==this.state.startDate){
            this.getDataPatient();
        }
    }
    handleDateChange = (date)=>{
        this.setState({
            startDate:date
        },async()=>{
            await this.getDataPatient();
        })
    }
    handleBtnConfirm = (item) => {
        let data ={
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        })
    }
    // handleBtnRemedy = () => {

    // }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal:{}
        })
    }
    sendRemedy = async (dataChild) =>{
        let {dataModal} = this.state;
        this.setState({isShowLoading: true});
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if(res && res.errCode ===0){
            this.setState({
                isShowLoading:false
            })
            toast.success('send Remedy successfully')
            this.closeRemedyModal();
            await this.getDataPatient();
        }else{
            this.setState({
                isShowLoading:false
            })
            toast.error('Error send Remedy...')
        }
    }
    render() {
        let {language} = this.props;
        let {dataPatient, isOpenRemedyModal, dataModal} = this.state;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className="manage-patient-container">
                        <div className='m-s-title'>
                            Quản lý bệnh nhân khám bệnh
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-4 form-group">
                                    <label>Chọn ngày khám</label>
                                    <DatePicker 
                                        className ="form-control"
                                        dateFormat = {language === LANGUAGES.VI? "dd/MM/yyyy":"MM/dd/yyyy"}
                                        selected={this.state.startDate} 
                                        onChange={(date) => this.handleDateChange(date)}
                                        value={this.state.startDate===''?language === LANGUAGES.VI? '-- Chọn ngày --':'-- Choose a date --':false}
                                    />
                                </div>
                                <div className="col-4 form-group">
                                    <button className='btn btn-primary btn-all' onClick={()=>{this.setState({startDate:''})}}>Tất cả</button>
                                </div>
                                <table className="table table-bordered mt-3">
                                    <thead className='table-dark'>
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Họ và tên</th>
                                            <th scope="col">Giới tính</th>
                                            <th scope="col">Thời gian</th>
                                            <th scope="col">Ngày</th>
                                            <th scope="col">Số điện thoại</th>
                                            <th scope="col">Trạng thái</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPatient && dataPatient.length > 0 ? 
                                            dataPatient.map((item, index)=>{
                                                return (
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{language === LANGUAGES.VI? 
                                                            item.patientData.genderData.valueVi: item.patientData.genderData.valueEn
                                                            }</td>
                                                        <td>{language === LANGUAGES.VI? 
                                                            item.timeTypeDataBooking.valueVi: item.timeTypeDataBooking.valueEn
                                                            }</td>
                                                        <td>{moment(item.date).format('DD-MM-YYYY')}</td>
                                                        <td>{item.patientData.phoneNumber}</td>
                                                        <td>{item.statusId ==='S0'?"Chưa xác nhận":
                                                            item.statusId ==='S1'?"Lịch hẹn mới":
                                                            item.statusId ==='S2'?"Đã xác nhận":
                                                            item.statusId ==='S3'?"Đã khám xong":
                                                            "Đã hủy"}</td>
                                                        <td>
                                                            <button className='mp-btn-confirm'
                                                                onClick={()=>this.handleBtnConfirm(item)}
                                                            >Xác nhận</button>
                                                            <button className='btn btn-danger'
                                                                onClick={()=>this.handleBtnRemedy()}
                                                            >Hủy</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan='6' style={{textAlign: 'center'}}>No data</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal 
                        isOpenModal ={isOpenRemedyModal}
                        dataModal ={dataModal}
                        closeRemedyModal ={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
