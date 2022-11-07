import React, { Component } from 'react';
import { connect } from "react-redux";
import {getDetailClinicById, getAllCodeService} from '../../services/userService';
import {LANGUAGES} from '../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../HomePage/HomeHeader';
import './InfoPatient.scss'
import _ from 'lodash';

class InfoPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
     }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
        }
    }
    
    render() {
        let {language} = this.props;
        return (
            <div className="detail-clinic-container">
                <HomeHeader/>
                <div className='info-patient'>
                    <div className='content-patient'>
                        <div className='main-patient'>
                            <h1>Hồ sơ của tôi</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoPatient);
