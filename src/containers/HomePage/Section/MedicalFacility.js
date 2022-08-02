import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";

class MedicalFacility extends Component {

    render() {
        return (
            <div className="section section-container">
                <div className="section-content">
                    <div className="section-header">
                        <button>TÌM KIẾM</button>
                        <span>Cơ sở y tế nổi bật</span>
                    </div>
                    <Slider {...this.props.settings}>
                        <div className='slide'>
                            <div className='img-slide img-medical-facility'/>
                            <div className='title-slide'>Phòng khám Vietlife MRI Trần Bình Trọng 1</div>
                        </div>
                        <div className='slide'>
                            <div className='img-slide img-medical-facility'/>
                            <div className='title-slide'>Phòng khám Vietlife MRI Trần Bình Trọng 2</div>
                        </div>
                        <div className='slide'>
                            <div className='img-slide img-medical-facility'/>
                            <div className='title-slide'>Phòng khám Vietlife MRI Trần Bình Trọng 3</div>
                        </div>
                        <div className='slide'>
                            <div className='img-slide img-medical-facility'/>
                            <div className='title-slide'>Phòng khám Vietlife MRI Trần Bình Trọng 4</div>
                        </div>
                        <div className='slide'>
                            <div className='img-slide img-medical-facility'/>
                            <div className='title-slide'>Phòng khám Vietlife MRI Trần Bình Trọng 5</div>
                        </div>
                        <div className='slide'>
                            <div className='img-slide img-medical-facility'/>
                            <div className='title-slide'>Phòng khám Vietlife MRI Trần Bình Trọng 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
