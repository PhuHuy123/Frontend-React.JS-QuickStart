import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import {LANGUAGES} from '../../../utils';
import { withRouter } from 'react-router';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorsArr:[],
            isMobile: window.innerWidth < 768,
        }}
    async componentDidMount() {
        this.props.loadTopDoctors();
        window.addEventListener("resize", this.updateIsMobile);
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
    handleViewDetailDoctor =(item)=>{
        if(this.props.history){
            this.props.history.push(`/detail-doctor/${item.id}`)
        }
    }
    render() {
        let {doctorsArr, isMobile} = this.state
        let {language} = this.props
        return (
            <div className="section section-doctor">
                <div className={isMobile?"section-content section-mobi":"section-content"}>
                    <div className="section-header">
                    <Link to='/all-doctor'><button><FormattedMessage id="homepage.see-more"/></button></Link>
                        <span><FormattedMessage id="homepage.outstanding-doctor"/></span>
                    </div>
                    <Slider {...this.props.settings}>
                         {doctorsArr && doctorsArr.length > 0 &&
                            doctorsArr.map((item, index)=>{
                                let imgBase64=''
                                if(item.image){
                                    imgBase64= Buffer.from(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                return(
                                    <div className='slide slide-doctor' key={index} 
                                        onClick={()=>this.handleViewDetailDoctor(item)}
                                    >
                                        <div className="slide-doctor">
                                            <div className='img-slide img-doctor'
                                                style={{backgroundImage:`url('${imgBase64}')`}}
                                            />
                                            <h3 className='title-slide'>
                                                {language===LANGUAGES.VI?nameVi:nameEn}
                                            </h3>
                                            {/* <h4 className='title-2'>Thần kinh-Cột sống</h4> */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
