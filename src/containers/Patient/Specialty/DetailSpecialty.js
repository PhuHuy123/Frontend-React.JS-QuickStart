import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss';
import {getDetailSpecialtyById, getAllCodeService} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import _ from 'lodash';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            })
            let resProvince = await getAllCodeService('PROVINCE');
            if(res && res.errCode===0 && resProvince && resProvince.errCode===0){
                let data = res.data;
                let arrDoctorId = [];
                if(data && !_.isEmpty(data)){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length>0){
                        arr.map(item =>{
                            arrDoctorId.push(item.doctorId)
                        })
                        
                    }
                }
                let dataProvince = resProvince.data;
                if(dataProvince && dataProvince.length > 0){
                    dataProvince.unshift({
                        createAt:null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueVi: 'Toàn quốc',
                        valueEn: 'Nationwide',
                    })
                }
                this.setState({
                    dataDetailSpecialty:res.data,
                    arrDoctorId:arrDoctorId,
                    listProvince: dataProvince ? dataProvince: [],                     
                })
            }
        }
     }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
        }
    }
    handlerOnChangeSelect = async(e)=>{
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let location = e.target.value;
            let res = await getDetailSpecialtyById({
                id: id,
                location: location
            })
            if(res && res.errCode===0){
                let data = res.data;
                let arrDoctorId = [];
                if(data && !_.isEmpty(data)){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length>0){
                        arr.map(item =>{
                            arrDoctorId.push(item.doctorId)
                        })
                        
                    }
                }
                this.setState({
                    dataDetailSpecialty:res.data,
                    arrDoctorId:arrDoctorId,
                })
            }
        }
    }
    render() {
        let {language} = this.props;
        let {arrDoctorId, dataDetailSpecialty, listProvince} = this.state;
        return (
            <div className="detail-specialty-container">
                <HomeHeader/>
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailSpecialty && dataDetailSpecialty.descriptionHTML
                            && <div dangerouslySetInnerHTML={{__html: dataDetailSpecialty.descriptionHTML}}></div>
                        }
                    </div>
                    <div className="search-sp-doctor">
                        <select onChange={(e)=>this.handlerOnChangeSelect(e)}>
                            {listProvince && listProvince.length>0 &&
                                listProvince.map((item, index)=>{
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ?item.valueVi:item.valueEn}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {arrDoctorId && arrDoctorId.length>0 &&
                        arrDoctorId.map((item, index)=>{
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor 
                                                doctorId={item}
                                                isShowMarkdown = {true}
                                                isShowLinkDetail = {true}
                                                isShowPrice = {false}
                                                // dataTime ={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className="doctor-extraInfo">
                                            <DoctorExtraInfo
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
