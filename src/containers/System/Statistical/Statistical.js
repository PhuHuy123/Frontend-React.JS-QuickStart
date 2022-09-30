import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountrySelector from './CountrySelector.js';
import Highlight from './Highlight/Highlight.js';
import Summary from './Summary/Summary';
import { getReportByCountry, getALLBooking} from '../../../services/userService';
// import HomeHeader from '../HomePage/HomeHeader';
import './Statistical.scss';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import {LANGUAGES, LanguageUtils} from '../../../utils';
import { FormControl, FormHelperText, InputLabel, NativeSelect } from '@material-ui/core';

class Statistical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            selectedCountryId: 'Tất cả',
            report: [],
            bookings: [],

            listDoctors:[],
        }
    }
    async componentDidMount(){
        this.props.fetAllDoctorsRedux();
        let res = await getALLBooking('ALL');
        this.setState({
            bookings: res
        })
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.arrDoctors!==this.props.arrDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.arrDoctors)
            {this.props.language === LANGUAGES.VI ?
                dataSelect.unshift({label: 'Tất cả', value: 'ALL'})
                : dataSelect.unshift({label: 'All Doctors', value: 'ALL'})
            }
            this.setState({
                listDoctors:dataSelect,
            })
        }
        if(prevProps.language!==this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.arrDoctors)
            {this.props.language === LANGUAGES.VI ?
            dataSelect.unshift({label: 'Tất cả', value: 'ALL'})
            : dataSelect.unshift({label: 'All Doctors', value: 'ALL'})
            }
            this.setState({
                listDoctors:dataSelect,
            })
        }
    }
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
    handleChange = async(input)=>{
        let res = await getALLBooking(input.value);
        this.setState({
            bookings: res,
            selectedCountryId: input.label
        })
    }
    render() {
        let {countries, report, bookings, listDoctors, selectedCountryId} = this.state
        return (
            <>
                <div className="high-chart-covid">
                    <Highlight
                        data = {this.props.arrUsers}
                        title='account'
                    />
                    <FormControl className='mt-4 mb-2'>
                        <InputLabel htmlFor='' shrink>
                            Bác sĩ
                        </InputLabel>
                        <Select
                            className="select-v"
                            onChange={this.handleChange}
                            value={selectedCountryId}
                            options={listDoctors}
                            placeholder={selectedCountryId}
                        />
                        <FormHelperText>Lựa chọn bác sĩ</FormHelperText>
                    </FormControl>
                    <Highlight
                        data = {bookings.data}
                        title='booking'
                    />
                    <Summary report={bookings.data}/>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        arrUsers: state.admin.users,
        arrDoctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        fetAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchRequiredDoctorInfo: () => dispatch(actions.fetchRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistical);
