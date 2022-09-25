import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";

class Handbook extends Component {

    render() {
        return (
            <div className="section section-container">
                <div className="section-content">
                    <div className="section-header">
                        <button>TẤT CẢ BÀI VIẾT</button>
                        <span>Bài viết</span>
                    </div>
                    <Slider {...this.props.settings}>
                        <div className='slide'>
                            <div className='img-slide img-medical-facility'/>
                            <div className='title-slide'>Tiêu đề bài viết 1</div>
                        </div>
                        <div className='slide'>
                            <div className='img-slide img-medical-facility'/>
                            <div className='title-slide'>Tiêu đề bài viết 2</div>
                        </div>
                        <div className='slide'>
                            <div className='img-slide img-medical-facility'/>
                            <div className='title-slide'>Tiêu đề bài viết 3</div>
                        </div>
                        <div className='slide'>
                            <div className='img-slide img-medical-facility'/>
                            <div className='title-slide'>Tiêu đề bài viết 4</div>
                        </div>
                        <div className='slide'>
                            <div className='img-slide img-medical-facility'/>
                            <div className='title-slide'>Tiêu đề bài viết 5</div>
                        </div>
                        <div className='slide'>
                            <div className='img-slide img-medical-facility'/>
                            <div className='title-slide'>Tiêu đề bài viết 6</div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
