import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Specialty.scss'
import Slider from "react-slick";
import {getAllSpecialty} from '../../../services/userService';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
            isMobile: window.innerWidth < 768,
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        if(res && res.errCode ===0) {
            this.setState({
                dataSpecialty: res.data ?res.data : [],
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
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topDoctors!==this.props.topDoctors){
            this.setState({
                doctorsArr:this.props.topDoctors,
                isMobi: window.innerWidth < 768
            })
        }
    }
    handleViewDetailSpecialty = (item)=>{
        if(this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }
    render() {
        let {dataSpecialty, isMobile} = this.state;
        return (
            <div className="section">
                <div className={isMobile?"section-content section-mobi":"section-content"}>
                    <div className="section-header">
                    <Link to='/all-specialty'><button><FormattedMessage id="homepage.see-more"/></button></Link>
                        <span><FormattedMessage id="homepage.specialty-popular"/></span>
                    </div>
                    <Slider {...this.props.settings}>
                        {dataSpecialty && dataSpecialty.length > 0 && 
                            dataSpecialty.map((item,index) =>{
                                return (
                                    <div className='slide' key={index}
                                        onClick={()=>this.handleViewDetailSpecialty(item)}
                                    >
                                        <div className='img-slide img-specialty'
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
