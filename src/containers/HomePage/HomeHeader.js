import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
class HomeHeader extends Component {

    render() {

        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <i className="fa fa-bars"></i>
                        <div className="header-logo">
                        </div>
                    </div>
                    <div className="center-content">
                        <button className="child-content">
                            <div>Chuyên khoa</div>
                            <span>Tìm bác sĩ theo chuyên khoa</span>
                        </button>
                        <button className="child-content">
                            <div>Cơ sở y tế</div>
                            <span>Chọn bệnh viện phòng khám</span>
                        </button>
                        <button className="child-content">
                            <div>Bác sĩ</div>
                            <span>Chọn bác sĩ giỏi</span>
                        </button>
                        <button className="child-content">
                            <div>Gói khám</div>
                            <span>Khám sức khỏe tổng quát</span>
                        </button>

                        
                    </div>
                    <div className="right-content">
                        <div className="support">
                            <i className="fa fa-question-circle"></i>
                            Hỗ trợ
                        </div>
                        <div className="flag">
                            VN
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
