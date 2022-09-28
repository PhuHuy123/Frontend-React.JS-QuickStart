import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePosts.scss';
import {createNewPosts} from '../../../services/userService';
import {LANGUAGES, CommonUtils} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManagePosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            description: '',
            imageBase64: '',
            contentMarkdown:'',
            contentHTML:'',
        }
    }

    async componentDidMount() {
       
    }
    handlerOnChangeInput=(e, id)=>{
        let copyState = {...this.state};
        copyState[id] = e.target.value;
        this.setState({...copyState});
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    handlerOnChangeImage = async(event)=>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImgURL:objectURL,
                imageBase64: base64
            })
        }
    }
    handlerSaveNewPosts = async ()=>{
        // console.log('Saving new Posts', this.state)
        let res = await createNewPosts(this.state)
        if (res && res.errCode ===0){
            toast.success('Add new Posts success!');
            this.setState({
                name:'',
                description: '',
                imageBase64: '',
                contentMarkdown: '',
                contentHTML: '',
            })
        }
        else {
            toast.error('Error creating new Posts!')
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
        }
    }

    render() {
        let {language} = this.props;
        return (
            <div className='manage-posts-container'>
                <div className='ms-title'>Quản lý bài viết</div>
                <div className='add-new-posts row'>
                    <div className='col-6 form-group'>
                        <label>Tên bài viết</label>
                        <input className='form-control' type='text' value={this.state.name} 
                                onChange={(e) => this.handlerOnChangeInput(e,'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh bài viết</label>
                        <input className='form-control-file' type='file'
                                onChange={(e) => this.handlerOnChangeImage(e)}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Thông tin bài viết</label>
                        <textarea className="form-control" rows='4'
                                onChange={(e)=>this.handlerOnChangeInput(e, 'description')}
                                value={this.state.description}
                            >
                        </textarea>
                    </div>
                    <div className='col-12'>
                        <label>Nội dung bài viết</label>
                        <MdEditor 
                            style={{ height: '390px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-posts' 
                                onClick={()=>this.handlerSaveNewPosts()}
                        >save
                        </button>
                    </div>
                </div>
            </div>
                
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePosts);
