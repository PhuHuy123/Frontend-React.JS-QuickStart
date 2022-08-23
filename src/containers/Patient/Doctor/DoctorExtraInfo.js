import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss';
import {} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
        }
    }

    async componentDidMount() {
       
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
        }
    }
    showDetailInfo = (show) =>{
        this.setState({ isShowDetailInfo: show })
    }
    render() {
        let {language} = this.props;
        let {isShowDetailInfo} = this.state
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">ĐỊA CHỈ KHÁM</div>
                    <div className="name-clinic">Phòng khám Bệnh viện Đại học Y Dược 1</div>
                    <div className="detail-address">20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM</div>
                </div>
                <div className="content-down">
                    {
                        isShowDetailInfo === false && 
                        <div className="short-info">
                            GIÁ KHÁM: 250.000đ 
                            <span onClick={()=>this.showDetailInfo(true)}> Xem chi tiết</span>
                        </div>
                    }
                    {
                       isShowDetailInfo === true && 
                       <>
                            <div className="title-price">GIÁ KHÁM:</div>
                            <div className="detail-info">
                                <div className="price">
                                    <span className='left'>Giá khám</span>
                                    <span className='right'>250.000đ </span>
                                </div>
                                <div className="note">
                                    Đối với các đơn vị bảo hiểm không bảo lãnh trực tiếp, phòng khám xuất hoá đơn tài chính (hoá đơn đỏ) và hỗ trợ bệnh nhân hoàn thiện hồ sơ
                                </div>
                            </div>
                            <div className="payment">
                                Khách hàng có thể thanh toán bằng hình thức tiền mặt
                            </div>
                            <div className="hide-price">
                                <span onClick={()=>this.showDetailInfo(false)}>Ẩn bảng giá</span>
                            </div> 
                       </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
