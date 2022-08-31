import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import {LANGUAGES, CRUD_ACTIONS} from '../../../utils';
import {getDetailInfoDoctor} from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // save to Markdown table
            contentMarkdown:'',
            contentHTML:'',
            selectedOption: '',
            description:'',
            listDoctors:[],
            checkSave: false,
            
            // save to Doctor Info Table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            listClinic: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            specialtyId: '',
            clinicId: '',
        }
    }
    componentDidMount() {
        this.props.fetAllDoctorsRedux();
        this.props.fetchRequiredDoctorInfo();
    }
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let {language}= this.props;
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
                let object = {};
                if(type === 'USERS'){
                    let valueVi = `${item.lastName} ${item.firstName}`;
                    let valueEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI? valueVi : valueEn;
                    object.value = item.id;
                    result.push(object);
                }
                if(type === 'PRICE'){
                    let valueVi = `${item.valueVi}`;
                    let valueEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI? valueVi : valueEn;
                    object.value = item.keyMap;
                    result.push(object);
                }
                if(type === 'PAYMENT' || type === 'PROVINCE'){
                    let valueVi = `${item.valueVi}`;
                    let valueEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI? valueVi : valueEn;
                    object.value = item.keyMap;
                    result.push(object);
                }
                if(type === 'SPECIALTY'){
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                }
            })
        }
        return result
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.arrDoctors!==this.props.arrDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.arrDoctors, 'USERS')
            this.setState({
                listDoctors:dataSelect,
            })
        }
        if(prevProps.language!==this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.arrDoctors, 'USERS');

            let {resPrice, resPayment, resProvince} = this.props.allRequiredDoctorInfo;
            let dataSelectedPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectedPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectedProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');

            this.setState({
                listDoctors:dataSelect,
                listPrice: dataSelectedPrice,
                listPayment: dataSelectedPayment,
                listProvince: dataSelectedProvince,
            })
        }
        if(prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo){
            let {resPrice, resPayment, resProvince, resSpecialty} = this.props.allRequiredDoctorInfo;

            let dataSelectedPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectedPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectedProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectedSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            this.setState({
                listPrice: dataSelectedPrice,
                listPayment: dataSelectedPayment,
                listProvince: dataSelectedProvince,  
                listSpecialty: dataSelectedSpecialty,
            })

        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown=()=>{
        let {checkSave}= this.state
        this.props.createInfoDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId : this.state.selectedOption.value,
            action : checkSave ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty.value,
            clinicId: 1,                                                                                                                                            
        })
    }

    handleChange = async(selectedOption)=> {
        this.setState({ selectedOption })
        let {listPayment, listPrice, listProvince, listSpecialty} = this.state;
        let res = await getDetailInfoDoctor(selectedOption.value)
        if(res && res.errCode===0 && res.data && res.data.Markdown){
            let Markdown = res.data.Markdown
            let priceId = '', provinceId = '', paymentId = '', 
                addressClinic = '', nameClinic = '', note = '',
                specialtyId='';
            let selectedPrice = '',
                selectedPayment = '',
                selectedProvince = '',
                selectedSpecialty = '';
            if(res.data.DoctorInfo){
                addressClinic = res.data.DoctorInfo.addressClinic
                nameClinic = res.data.DoctorInfo.nameClinic
                note = res.data.DoctorInfo.note
                priceId = res.data.DoctorInfo.priceId
                paymentId = res.data.DoctorInfo.paymentId
                provinceId = res.data.DoctorInfo.provinceId
                specialtyId = res.data.DoctorInfo.specialtyId

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
            }
            this.setState({
                description: Markdown.description,
                contentMarkdown: Markdown.contentMarkdown,
                contentHTML: Markdown.contentHTML,
                checkSave: true, 
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
            })
        }else{
            this.setState({
                description: '',
                contentMarkdown: '',
                contentHTML:'',
                checkSave: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
            })
        }
        
    };
    handleChangeSelectDoctorInfo = async(selectedOption, name)=> {
        let stateName = name.name;
        let copyState = {...this.state};
        copyState[stateName] = selectedOption;

        this.setState({
            ...copyState
        })
        
    };
    handleOnChangeText = (e, id) => {
        let copyState = {...this.state};
        copyState[id] = e.target.value;
        this.setState({ ...copyState })
    }
    render() {
        let {checkSave, selectedPrice, selectedPayment, selectedProvince, 
            selectedSpecialty, selectedClinic} = this.state
        console.log(this.state)
        return (
            <div className="container doctor-container">
                <div className="root">
                    <div className="manage-doctor-title">
                        Tao them thong tin bac si
                    </div>
                    <div className="more-info">
                        <div className="content-left">
                            <label>Chon bac si</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}
                                placeholder={'---Chon bac si---'}
                            />
                        </div>
                        <div className="content-right">
                            <label>Thong tin gioi thieu:</label>
                            <textarea className="form-control" rows='4'
                                onChange={(e)=>this.handleOnChangeText(e, 'description')}
                                value={this.state.description}
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="more-info-extra row">
                        <div className="col-4 form-group">
                            <label>Chọn giá</label>
                            <Select
                                value={selectedPrice}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listPrice}
                                placeholder={'---Chọn giá---'}
                                name= 'selectedPrice'
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Chọn phương thức thanh toán</label>
                            <Select
                                value={selectedPayment}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listPayment}
                                placeholder={'---Chọn phương thức thanh toán---'}
                                name = 'selectedPayment'
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Chọn tỉnh thành</label>
                            <Select
                                value={selectedProvince}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listProvince}
                                placeholder={'---Chọn tỉnh thành---'}
                                name = 'selectedProvince'
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Tên phòng khám</label>
                            <input className="form-control" 
                                onChange={(e)=>this.handleOnChangeText(e, 'nameClinic')}
                                value={this.state.nameClinic}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Địa chỉ phòng khám</label>
                            <input className="form-control" 
                                onChange={(e)=>this.handleOnChangeText(e, 'addressClinic')}
                                value={this.state.addressClinic}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Note</label>
                            <input className="form-control" 
                                onChange={(e)=>this.handleOnChangeText(e, 'note')}
                                value={this.state.note}
                            />
                        </div>
                        <div className="col-4 form-group">
                                <label>Chọn chuyên khoa</label>
                                <Select
                                    value={selectedSpecialty}
                                    onChange={this.handleChangeSelectDoctorInfo}
                                    options={this.state.listSpecialty}
                                    placeholder={'---Chọn chuyên khoa---'}
                                    name = 'selectedSpecialty'
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label>Chọn phòng khám</label>
                                <Select
                                    value={selectedClinic}
                                    onChange={this.handleChangeSelectDoctorInfo}
                                    options={this.state.listClinic}
                                    placeholder={'---Chọn phòng khám---'}
                                    name = 'selectedClinic'
                                />
                            </div>
                    </div>
                    <div className="manage-doctor-editor">
                        <MdEditor 
                            style={{ height: '390px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <button className={checkSave ===true ? 'update-content-doctor':"save-content-doctor"}
                        onClick={()=>this.handleSaveContentMarkdown()}
                    >{checkSave ===true ? 'Cap nhat thong tin':"Tao thong tin"}</button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        arrDoctors: state.admin.allDoctors,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        createInfoDoctor: (data) => dispatch(actions.createInfoDoctor(data)),
        fetchRequiredDoctorInfo: () => dispatch(actions.fetchRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
