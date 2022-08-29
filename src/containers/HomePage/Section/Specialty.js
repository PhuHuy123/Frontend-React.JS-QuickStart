import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Specialty.scss'
import Slider from "react-slick";
import {getAllSpecialty} from '../../../services/userService';
import { withRouter } from 'react-router';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        if(res && res.errCode ===0) {
            this.setState({
                dataSpecialty: res.data ?res.data : []
            })
        }
    }
    handleViewDetailSpecialty = (item)=>{
        if(this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }
    render() {
        let {dataSpecialty} = this.state;
        return (
            <div className="section">
                <div className="section-content">
                    <div className="section-header">
                        <button><FormattedMessage id="homepage.see-more"/></button>
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
