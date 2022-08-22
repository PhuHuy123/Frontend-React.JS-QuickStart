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
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
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
                let valueVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : `${item.valueVi}`;
                let valueEn = type === 'USERS' ? `${item.firstName} ${item.lastName}`: `${item.valueEn}`;
                object.label = language === LANGUAGES.VI? valueVi : valueEn;
                object.value = item.id;
                result.push(object);
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
            let dataSelect = this.buildDataInputSelect(this.props.arrDoctors)
            this.setState({
                listDoctors:dataSelect,
            })
        }
        if(prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo){
            let {resPrice, resPayment, resProvince} = this.props.allRequiredDoctorInfo;

            let dataSelectedPrice = this.buildDataInputSelect(resPrice);
            let dataSelectedPayment = this.buildDataInputSelect(resPayment);
            let dataSelectedProvince = this.buildDataInputSelect(resProvince);
            this.setState({
                listPrice: dataSelectedPrice,
                listPayment: dataSelectedPayment,
                listProvince: dataSelectedProvince,
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
            action : checkSave ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }

    handleChange = async(selectedOption)=> {
        this.setState({ selectedOption })
        let res = await getDetailInfoDoctor(selectedOption.value)
        if(res && res.errCode===0 && res.data && res.data.Markdown){
            let Markdown = res.data.Markdown
            this.setState({
                description: Markdown.description,
                contentMarkdown: Markdown.contentMarkdown,
                contentHTML: Markdown.contentHTML,
                checkSave: true,
            })
        }else{
            this.setState({
                description: '',
                contentMarkdown: '',
                contentHTML:'',
                checkSave: false,
            })
        }
        
    };

    handleOnChangeDesc = (e) => {
        this.setState({ description: e.target.value})
    }
    render() {
        let {checkSave} = this.state
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
                                onChange={(e)=>this.handleOnChangeDesc(e)}
                                value={this.state.description}
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="more-info-extra row">
                        <div className="col-4 form-group">
                            <label>Chọn giá</label>
                            <Select
                                // value={this.state.selectedOption}
                                // onChange={this.handleChange}
                                options={this.state.listPrice}
                                placeholder={'---Chọn giá---'}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Chọn phương thức thanh toán</label>
                            <Select
                                // value={this.state.selectedOption}
                                // onChange={this.handleChange}
                                options={this.state.listPayment}
                                placeholder={'---Chọn phương thức thanh toán---'}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Chọn tỉnh thành</label>
                            <Select
                                // value={this.state.selectedOption}
                                // onChange={this.handleChange}
                                options={this.state.listProvince}
                                placeholder={'---Chọn tỉnh thành---'}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Tên phòng khám</label>
                            <input className="form-control" />
                        </div>
                        <div className="col-4 form-group">
                            <label>Địa chỉ phòng khám</label>
                            <input className="form-control" />
                        </div>
                        <div className="col-4 form-group">
                            <label>Note</label>
                            <input className="form-control" />
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
