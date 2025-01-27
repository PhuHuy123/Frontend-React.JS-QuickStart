import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import { withRouter } from 'react-router';
import {getAllClinic} from '../../../services/userService';
import { Link } from 'react-router-dom';
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
            isMobile: window.innerWidth < 768,
        }
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if(res && res.errCode ===0) {
            this.setState({
                dataClinic: res.data ?res.data : [],
                isMobi: window.innerWidth < 768
            })
            window.addEventListener("resize", this.updateIsMobile);
        }
    }
    updateIsMobile=()=> {
        this.setState({
          isMobile: window.innerWidth < 768,
        });
      }
      componentWillUnmount() {
        window.removeEventListener("resize", this.updateIsMobile);
      }
    handleViewDetailClinic = (item)=>{
        if(this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`)
        }
    }
    render() {
        let {dataClinic, isMobile} = this.state;
        return (
            <div className="section section-container">
                <div className={isMobile?"section-content section-mobi":"section-content"}>
                    <div className="section-header">
                    <Link to='/all-clinic'><button><FormattedMessage id="homepage.see-more"/></button></Link>
                        <span><FormattedMessage id="homepage.outstanding-clinic"/></span>
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
