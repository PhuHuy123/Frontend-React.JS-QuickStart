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
import {getAllPatientForDoctor} from'../../../services/userService'
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            dataPatient: [],
        }
    }
    async componentDidMount() {
        let {user} = this.props;
        let {startDate} = this.state;
        let formattedDate = moment(startDate).format('YYYY-MM-DD')
        this.getDataPatient(user, formattedDate);
    }

    getDataPatient = async(user, formattedDate) =>{
        let res = await getAllPatientForDoctor({
            doctorId: user.id, 
            date: formattedDate
        })
        if(res && res.errCode ===0){
            this.setState({dataPatient: res.data});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language!==this.props.language){
        }
    }
    handleDateChange = async(date)=>{
        this.setState({
            startDate:date
        },()=>{
            let {user} = this.props;
            let {startDate} = this.state;
            let formattedDate = moment(startDate).format('YYYY-MM-DD')
            this.getDataPatient(user, formattedDate);
        })
    }
    handleBtnConfirm = () => {

    }
    handleBtnRemedy = () => {

    }
    render() {
        let {language} = this.props;
        let {dataPatient} = this.state;
        console.log(`render`, this.state);
        return (
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
                        <table className="table table-bordered mt-3">
                            <thead className='table-dark'>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Họ và tên</th>
                                    <th scope="col">Giới tính</th>
                                    <th scope="col">Thời gian</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataPatient && dataPatient.length > 0 && 
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
                                                <td>{item.patientData.phoneNumber}</td>
                                                <td>
                                                    <button className='mp-btn-confirm'
                                                        onClick={()=>this.handleBtnConfirm()}
                                                    >Xác nhận</button>
                                                    <button className='mp-btn-remedy'
                                                        onClick={()=>this.handleBtnRemedy()}
                                                    >Gửi hóa đơn</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
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
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
