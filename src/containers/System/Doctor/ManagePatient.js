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
import {bulkCreateSchedule} from'../../../services/userService'
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
        }
    }
    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language!==this.props.language){
        }
    }
    handleDateChange = async(date)=>{
        this.setState({startDate:date})
    }
    render() {
        let {language} = this.props
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
                                <th scope="col">Email</th>
                                <th scope="col">First name</th>
                                <th scope="col">Last name</th>
                                <th scope="col">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
