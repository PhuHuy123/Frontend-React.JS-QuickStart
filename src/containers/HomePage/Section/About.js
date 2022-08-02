import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class Specialty extends Component {

    render() {
        return (
            <div className="section section-about">
                <div className="section-content">
                    <div className="section-header">
                        <button>XEM THÊM</button>
                        <span>Hướng dẫn đặt lịch khám bệnh trực tuyến</span>
                    </div>
                    <div className="about-middle">
                        <iframe width="59%" height="100%" src="https://www.youtube.com/embed/6VVH21RBWdc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <span>Quý khách hàng có nhu cầu đặt hẹn khám tại Hệ thống, xin vui lòng thực hiện theo hướng dẫn:
                            <ul>
                                <li>Đặt hẹn bằng cách gọi tổng đài Chăm sóc khách hàng tại số 0202 102 2202 (Đường dây nóng tư vấn khách hàng) hoặc 1800 0000 (Bệnh viện Đa khoa Tâm Anh Hà Nội)</li>
                                <li>Đặt hẹn trực tuyến bằng cách điền thông tin vào mẫu bên dưới.</li>
                                <li>Xin lưu ý, trong các trường hợp khẩn cấp, quý khách vui lòng đến ngay cơ sở y tế gần nhất hoặc đến trực tiếp Hệ thống</li>
                            </ul>
                        </span>
                    </div>
                    <div className="about-right">
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
