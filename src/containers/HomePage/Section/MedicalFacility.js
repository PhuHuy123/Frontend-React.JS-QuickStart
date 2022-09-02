import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import { withRouter } from 'react-router';
import {getAllClinic} from '../../../services/userService';
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        }
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if(res && res.errCode ===0) {
            this.setState({
                dataClinic: res.data ?res.data : []
            })
        }
    }
    handleViewDetailClinic = (item)=>{
        if(this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`)
        }
    }
    render() {
        let {dataClinic} = this.state;
        return (
            <div className="section section-container">
                <div className="section-content">
                    <div className="section-header">
                    <button>TÌM KIẾM</button>
                        <span>Cơ sở y tế nổi bật</span>
                    </div>
                    <Slider {...this.props.settings}>
                        {dataClinic && dataClinic.length > 0 && 
                            dataClinic.map((item,index) =>{
                                return (
                                    <div className='slide' key={index}
                                        onClick={()=>this.handleViewDetailClinic(item)}
                                    >
                                        <div className='img-slide img-medical'
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
