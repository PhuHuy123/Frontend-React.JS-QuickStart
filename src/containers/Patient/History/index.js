import React, { Component } from "react";
import { connect } from "react-redux";
import "./History.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import { getAllExaminationById } from "../../../services/userService";
import _ from "lodash";
import { Link } from "react-router-dom";
import moment from "moment";
import { Modal } from "reactstrap";
import Modals from "./Modal";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: {},
      history: [],
      isModalSee: false,
      dataModal: "",
      isMobile: window.innerWidth < 1062,
    };
  }
  updateIsMobile = () => {
    this.setState({
      isMobile: window.innerWidth < 1062,
    });
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateIsMobile);
  }
  async componentDidMount() {
    window.addEventListener("resize", this.updateIsMobile);
    this.setState({
      gender: this.props.userInfo.genderData,
    });
    this.getHistory();
  }
  getHistory = async () => {
    let res = await getAllExaminationById(this.props.userInfo.id);
    if (res && res.errCode === 0) {
      this.setState({
        history: res.data,
      });
    }
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleSeeDetails = (data) => {
    this.setState({
      isModalSee: true,
      dataModal: data,
    });
  };
  closeBooking = () => {
    this.setState({
      isModalSee: false,
    });
  };
  render() {
    let { language, userInfo } = this.props;
    let { gender, history, isModalSee, dataModal, isMobile } = this.state;
    return (
      <div className="history-container">
        <HomeHeader />
        <div className="container">
          <div className="row">
            {!isMobile && (
              <div className="nav-left col-2">
                <div className="navBar-info">
                  <Link to="/info-patient">
                    <p>
                      <i className="fa fa-user" aria-hidden="true"></i> <FormattedMessage id="navbar.personal-information" />
                    </p>
                  </Link>
                  <Link to="/single">
                    <p>
                      <i className="fa fa-file" aria-hidden="true"></i> <FormattedMessage id="navbar.medical-order" />
                    </p>
                  </Link>
                  <Link to="/history">
                    <p style={{ color: "blue" }}>
                      <i className="fa fa-history" aria-hidden="true"></i> <FormattedMessage id="navbar.medical-history" />
                    </p>
                  </Link>
                </div>
              </div>
            )}
            <div className={isMobile ? "nav-right col-12 row":"nav-right col-10 row"}>
              {!isMobile && (
                <div className="content-left col-4">
                  <h4>
                    <b>
                      {language === LANGUAGES.VI
                        ? `${userInfo.lastName} ${userInfo.firstName}`
                        : `${userInfo.firstName} ${userInfo.lastName}`}
                    </b>
                  </h4>
                  <div className="info">
                    <div className="avatar">
                      <img
                        alt="avatar"
                        src={
                          userInfo.image
                            ? userInfo.image
                            : "https://i.imgur.com/LntFpBn.png"
                        }
                      />
                    </div>
                    <div className="">
                      <div>
                        <b>Mã bệnh nhân:</b>
                        <p>P0{userInfo.id}</p>
                      </div>
                      <div>
                        <b>Giới tính:</b>
                        <p>
                          {userInfo.gender
                            ? language === LANGUAGES.VI
                              ? gender.valueVi
                              : gender.valueEn
                            : ""}
                        </p>
                      </div>
                      <div>
                        <b>Ngày sinh:</b>
                        <p>18/09/2000</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <b>Địa chỉ:</b>
                    <p>{userInfo.address}</p>
                  </div>
                  <div>
                    <b>Email:</b>
                    <p>{userInfo.email}</p>
                  </div>
                  <div>
                    <b>Số điện thoại:</b>
                    <p>{userInfo.phoneNumber}</p>
                  </div>
                </div>
              )}
              <div className={isMobile ?"content-right col-12":"content-right col-8"}>
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
                    {history.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <b>{item.name}</b>
                          <p className="comment">{item.comment}</p>
                        </td>
                        <td>
                          {language === LANGUAGES.VI
                            ? moment(item.date).format("DD-MM-YYYY")
                            : moment(item.date).format("MM-DD-YYYY")}
                        </td>
                        <td>
                          {language === LANGUAGES.VI
                            ? `${item.dataDoctor.lastName} ${item.dataDoctor.firstName}`
                            : `${item.dataDoctor.firstName} ${item.dataDoctor.lastName}`}
                        </td>
                        <td>
                          <button
                            className="see-details"
                            onClick={() => this.handleSeeDetails(item)}
                          >
                            Xem chi tiết
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {isModalSee && (
          <Modals
            isOpen={isModalSee}
            dataSee={dataModal}
            dataDoctor={dataModal.dataDoctor}
            closeBooking={this.closeBooking}
          />
        )}
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
