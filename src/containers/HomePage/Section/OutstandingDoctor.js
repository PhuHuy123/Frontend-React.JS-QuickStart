import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";

class Specialty extends Component {

    render() {
        return (
            <div className="section section-doctor">
                <div className="section-content">
                    <div className="section-header">
                        <button>TÌM KIẾM</button>
                        <span>Chuyên khoa phổ biến</span>
                    </div>
                    <Slider {...this.props.settings}>
                        <div className='slide slide-doctor'>
                            <div className="slide-doctor">
                                <div className='img-slide img-doctor'/>
                                <h3 className='title-slide'>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thọ Lộ, Benh vien so 1</h3>
                                <h4 className='title-2'>Thần kinh-Cột sống</h4>
                            </div>
                        </div>
                        <div className='slide slide-doctor'>
                            <div className="slide-doctor">
                                <div className='img-slide img-doctor'/>
                                <h3 className='title-slide'>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thọ Lộ</h3>
                                <h4 className='title-2'>Thần kinh-Cột sống</h4>
                            </div>
                        </div>
                        <div className='slide slide-doctor'>
                            <div className="slide-doctor">
                                <div className='img-slide img-doctor'/>
                                <h3 className='title-slide'>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thọ Lộ</h3>
                                <h4 className='title-2'>Thần kinh-Cột sống</h4>
                            </div>
                        </div>
                        <div className='slide slide-doctor'>
                            <div className="slide-doctor">
                                <div className='img-slide img-doctor'/>
                                <h3 className='title-slide'>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thọ Lộ</h3>
                                <h4 className='title-2'>Thần kinh-Cột sống</h4>
                            </div>
                        </div>
                        <div className='slide slide-doctor'>
                            <div className="slide-doctor">
                                <div className='img-slide img-doctor'/>
                                <h3 className='title-slide'>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thọ Lộ</h3>
                                <h4 className='title-2'>Thần kinh-Cột sống</h4>
                            </div>
                        </div>
                        <div className='slide slide-doctor'>
                            <div className="slide-doctor">
                                <div className='img-slide img-doctor'/>
                                <h3 className='title-slide'>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thọ Lộ</h3>
                                <h4 className='title-2'>Thần kinh-Cột sống</h4>
                            </div>
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
