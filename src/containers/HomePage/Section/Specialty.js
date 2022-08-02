import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";

class Specialty extends Component {

    render() {
        return (
            <div className="section">
                <div className="section-content">
                    <div className="section-header">
                        <button>XEM THÊM</button>
                        <span>Chuyên khoa phổ biến</span>
                    </div>
                    <Slider {...this.props.settings}>
                        <div className='slide'>
                            <div className='img-slide img-specialty'/>
                            <div className='title-slide'>Tim mạch 1</div>
                        </div>
                        <div className='slide'>
                            <div className='img-slide img-specialty'/>
                            <div className='title-slide'>Tim mạch 2</div>
                        </div>
                        <div className='slide'>
                            <div className='img-slide img-specialty'/>
                            <div className='title-slide'>Tim mạch 3</div>
                        </div>
                        <div className='slide'>
                            <div className='img-slide img-specialty'/>
                            <div className='title-slide'>Tim mạch 4</div>
                        </div>
                        <div className='slide'>
                            <div className='img-slide img-specialty'/>
                            <div className='title-slide'>Tim mạch5</div>
                        </div>
                        <div className='slide'>
                            <div className='img-slide img-specialty'/>
                            <div className='title-slide'>Tim mạch 6</div>
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
