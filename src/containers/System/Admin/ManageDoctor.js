import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown:'',
            contentHTML:'',
            selectedOption: '',
            description:'',
        }
    }
    componentDidMount() {
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            connectMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown=()=>{
        console.log('saveContentMarkdown', this.state)
    }

    handleChange = (selectedOption)=> {
        this.setState({ selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    handleOnChangeDesc = (e) => {
        this.setState({ description: e.target.value})
    }
    render() {
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
                                options={options}
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
                        />
                    </div>
                    <button className="save-content-doctor"
                        onClick={()=>this.handleSaveContentMarkdown()}
                    >Luu thong tin</button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        arrUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
