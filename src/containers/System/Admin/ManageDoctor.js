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
            contentMarkdown:'',
            contentHTML:'',
            selectedOption: '',
            description:'',
            listDoctors:[],
            checkSave: false,
            action: '',
        }
    }
    componentDidMount() {
        this.props.fetAllDoctorsRedux();
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
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.arrDoctors!==this.props.arrDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.arrDoctors)
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
        arrDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        createInfoDoctor: (data) => dispatch(actions.createInfoDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
