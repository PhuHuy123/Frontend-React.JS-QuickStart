import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {


    render() {
        let settings = {
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 4,
                slidesToScroll: 1
            };
        return (
            <div className="section-specialty">
                <div className="specialty-container">
                    <div className="specialty-header">
                        <button>XEM THÊM</button>
                        <span>Chuyên khoa phổ biến</span>
                    </div>
                    <Slider {...settings}>
                        <div className='slide'>
                            <div className='img-specialty'/>
                            <div>Tim mạch 1</div>
                        </div>
                        <div className='slide'>
                            <div className='img-specialty'/>
                            <div>Tim mạch 2</div>
                        </div>
                        <div className='slide'>
                            <div className='img-specialty'/>
                            <div>Tim mạch 3</div>
                        </div>
                        <div className='slide'>
                            <div className='img-specialty'/>
                            <div>Tim mạch 4</div>
                        </div>
                        <div className='slide'>
                            <div className='img-specialty'/>
                            <div>Tim mạch5</div>
                        </div>
                        <div className='slide'>
                            <div className='img-specialty'/>
                            <div>Tim mạch 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
