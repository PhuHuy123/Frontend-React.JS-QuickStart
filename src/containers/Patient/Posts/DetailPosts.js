import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailPosts.scss';
import {getDetailPostsById} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import _ from 'lodash';

class DetailPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailPosts: {},
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id
            let res = await getDetailPostsById(id);
            if(res && res.errCode===0){
                this.setState({
                    dataDetailPosts:res.data              
                })
            }else{
                console.log(res.errCode);
            }
        } 
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
        }
    }
    render() {
        let {language} = this.props;
        let {dataDetailPosts} = this.state;
        return (
            <div className="detail-posts-container">
                <HomeHeader/>
                <div className="detail-posts-body">
                    <div className="description-posts">
                        <h1 className='name'>{dataDetailPosts && dataDetailPosts.name?dataDetailPosts.name:''}</h1>
                        <p className='description'>{dataDetailPosts && dataDetailPosts.description?dataDetailPosts.description:''}</p>
                        <div className="image-posts"
                            style={{backgroundImage:`url('${dataDetailPosts && dataDetailPosts.image?dataDetailPosts.image:''}')`}}
                        ></div>
                            {dataDetailPosts && dataDetailPosts.descriptionHTML
                                && <div dangerouslySetInnerHTML={{__html: dataDetailPosts.descriptionHTML}}></div>
                            }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailPosts);
