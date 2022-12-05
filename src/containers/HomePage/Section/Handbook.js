import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {getAllPosts} from '../../../services/userService';
import Slider from "react-slick";
import './Specialty.scss'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
class Handbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPosts: [],
        }
    }
    async componentDidMount() {
        let res = await getAllPosts();
        if(res && res.errCode ===0) {
            this.setState({
                dataPosts: res.data ?res.data : []
            })
        }
    }
    handleViewDetailPosts = (item)=>{
        if(this.props.history) {
            this.props.history.push(`/detail-posts/${item.id}`)
        }
    }
    render() {
        let {dataPosts} = this.state;
        return (
            <div className="section section-container">
                <div className="section-content">
                    <div className="section-header">
                    <Link to='/all-posts'><button>TẤT CẢ BÀI VIẾT</button></Link>
                        <span>Bài viết</span>
                    </div>
                    <Slider {...this.props.settings}>
                    {dataPosts && dataPosts.length > 0 && 
                            dataPosts.map((item,index) =>{
                                return (
                                    <div className='slide' key={index}
                                        onClick={()=>this.handleViewDetailPosts(item)}
                                    >
                                        <div className='img-slide img-medical-facility'
                                            style={{backgroundImage: `url(${item.image})`}}
                                        />
                                        <div className='title-slide'>{item.name}</div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
