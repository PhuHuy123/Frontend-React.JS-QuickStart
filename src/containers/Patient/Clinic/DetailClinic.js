import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss';
import {getDetailClinicById, getAllCodeService} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import _ from 'lodash';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            listProvince: [],
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id
            let res = await getDetailClinicById({
                id: id,
            })
            let resProvince = await getAllCodeService('PROVINCE');
            console.log(resProvince);
            if(res && res.errCode===0 && resProvince && resProvince.errCode===0){
                let data = res.data;
                let arrDoctorId = [];
                if(data && !_.isEmpty(data)){
                    let arr = data.doctorClinic;
                    if(arr && arr.length>0){
                        arr.map(item =>{
                            arrDoctorId.push(item.doctorId)
                        })
                        
                    }
                }
                this.setState({
                    dataDetailClinic:res.data,
                    arrDoctorId:arrDoctorId,                    
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
            let res = await getDetailClinicById({
                id: id,
            })
            if(res && res.errCode===0){
                let data = res.data;
                let arrDoctorId = [];
                if(data && !_.isEmpty(data)){
                    let arr = data.doctorClinic;
                    if(arr && arr.length>0){
                        arr.map(item =>{
                            arrDoctorId.push(item.doctorId)
                        })
                        
                    }
                }
                this.setState({
                    dataDetailClinic:res.data,
                    arrDoctorId:arrDoctorId,
                })
            }
        }
    }
    render() {
        let {language} = this.props;
        let {arrDoctorId, dataDetailClinic, listProvince} = this.state;
        return (
            <div className="detail-clinic-container">
                <HomeHeader/>
                <div className="detail-clinic-body">
                    <div className="description-clinic">
                        {dataDetailClinic && dataDetailClinic.descriptionHTML
                            && <div dangerouslySetInnerHTML={{__html: dataDetailClinic.descriptionHTML}}></div>
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
