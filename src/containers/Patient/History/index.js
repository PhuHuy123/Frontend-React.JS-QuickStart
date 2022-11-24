import React, { Component } from "react";
import { connect } from "react-redux";
import "./History.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import _ from "lodash";
import { Link } from "react-router-dom";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
        gender:{},
    };
  }

  async componentDidMount() {
    this.setState({
      gender: this.props.userInfo.genderData 
    })
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  render() {
    let { language, userInfo } = this.props;
    let {gender} = this.state;
    return (
      <div className="history-container">
        <HomeHeader />
        <div className="container">
          <div className="row">
            <div className="nav-left col-2">
              <Link to=''><p><i className="fa-regular fa-user"></i> Thông tin cá nhân</p></Link>
              <Link to=''><p><i className="fa-solid fa-file-invoice"></i> Đơn đặt khám</p></Link>
              <Link to='/history'><p style={{color: 'blue'}}><i className="fa-solid fa-clock-rotate-left"></i> Lịch sử khám</p></Link>
            </div>
            <div className="nav-right col-10 row">
              <div className="content-left col-4">
                <h4>
                  <b>{language === LANGUAGES.VI ? `${userInfo.lastName} ${userInfo.firstName}`:`${userInfo.firstName} ${userInfo.lastName}`}</b>
                </h4>
                <div className="info">
                  <div className="avatar">
                    <img
                      alt="avatar"
                      src={userInfo.image ? userInfo.image :""}
                    />
                  </div>
                  <div className="">
                    <div>
                      Mã bệnh nhân:
                      <p>P0{userInfo.id}</p>
                    </div>
                    <div>
                      Giới tính:
                      <p>{language === LANGUAGES.VI ? gender.valueVi: gender.valueEn}</p>
                    </div>
                    <div>
                      Ngày sinh:
                      <p>18/09/2000</p>
                    </div>
                  </div>
                </div>
                <div>
                  Địa chỉ:
                  <p>{userInfo.address}</p>
                </div>
                <div>
                  Email:
                  <p>{userInfo.email}</p>
                </div>
                <div>
                  Số điện thoại:
                  <p>{userInfo.phoneNumber}</p>
                </div>
              </div>
              <div className="content-right col-8">
                <div className="c-history">Lịch sử khám</div>
                <b>Tất cả phiên khám</b>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Lần khám</th>
                      <th scope="col">Ngày</th>
                      <th scope="col">Bác sĩ khám</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><b>Đau dạ dày</b><p>viêm dạ dày nặng..................</p></td>
                      <td>20/11/2022</td>
                      <td>Hà Văn Quyết</td>
                      <td><Link to="/">Xem chi tiết</Link></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
