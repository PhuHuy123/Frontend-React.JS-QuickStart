import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import {LANGUAGES} from '../../../utils';

import Slider from "react-slick";

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorsArr:[],
        }}
    async componentDidMount() {
        this.props.loadTopDoctors();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topDoctors!==this.props.topDoctors){
            this.setState({
                doctorsArr:this.props.topDoctors
            })
        }
    }
    render() {
        console.log(this.props.topDoctors)
        let {doctorsArr} = this.state
        let {language} = this.props
        return (
            <div className="section section-doctor">
                <div className="section-content">
                    <div className="section-header">
                        <button>TÌM KIẾM</button>
                        <span>Chuyên khoa phổ biến</span>
                    </div>
                    <Slider {...this.props.settings}>
                         {doctorsArr && doctorsArr.length > 0 &&
                            doctorsArr.map((item, index)=>{
                                let imgBase64=''
                                if(item.image){
                                    imgBase64= new Buffer(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                return(
                                    <div className='slide slide-doctor' key={index}>
                                        <div className="slide-doctor">
                                            <div className='img-slide img-doctor'
                                                style={{backgroundImage:`url('${imgBase64}')`}}
                                            />
                                            <h3 className='title-slide'>
                                                {language===LANGUAGES.VI?nameVi:nameEn}
                                            </h3>
                                            <h4 className='title-2'>Thần kinh-Cột sống</h4>
                                        </div>
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
        topDoctors: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
