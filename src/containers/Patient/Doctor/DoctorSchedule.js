import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";
import { Link } from "react-router-dom";
import {Modal,Button, ModalBody, ModalFooter} from 'reactstrap';
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
      checkLogin: false,
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDate(language);
    this.setState({
      allDays: allDays,
    });
    if (this.props.doctorIdFromParent) {
      let allDays = this.getArrDate(this.props.language);
      let dt = new Date(+allDays[0].value);
      let date = moment(dt).format("YYYY-MM-DD");
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        date
      );
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }
  getArrDate = (language) => {
    let allDays = [];
    for (let i = 1; i < 8; i++) {
      let object = {};
      if (language === LANGUAGES.EN) {
        if (i === 1) {
          object.label = `Tomorrow - ${moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("MM/DD")}`;
        } else
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("dddd - MM/DD");
      } else {
        if (i === 1) {
          object.label = `Ngày mai - ${moment(new Date())
            .add(i, "days")
            .format("DD/MM")}`;
        } else
          object.label = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDate(this.props.language);
      this.setState({ allDays: allDays });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrDate(this.props.language);
      let dt = new Date(+allDays[0].value);
      let date = moment(dt).format("YYYY-MM-DD");
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        date
      );
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }
  handlerOnChangeSelect = async (e) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let dt = new Date(+e.target.value);
      let date = moment(dt).format("YYYY-MM-DD");
      let res = await getScheduleDoctorByDate(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
      console.log("res: ", res);
    }
  };
  handleClickScheduleTime = (time) => {
    if(this.props.isLoggedIn === false) {
      return this.setState({
        checkLogin: true
      })
    }
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
    console.log("time: ", time);
  };
  closeBooking = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let {
      allDays,
      allAvailableTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
      checkLogin,
    } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(e) => this.handlerOnChangeSelect(e)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fa fa-calendar-alt"></i>
              <span>
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                allAvailableTime.map((item, index) => {
                  let timeDisplay =
                    language === LANGUAGES.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn;
                  return (
                    <button
                      key={index}
                      className={
                        language === LANGUAGES.VI
                          ? "btn-time-vi"
                          : "btn-time-en"
                      }
                      onClick={() => this.handleClickScheduleTime(item)}
                    >
                      {timeDisplay}
                    </button>
                  );
                })
              ) : (
                <div className="attention">
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBooking={this.closeBooking}
          dataTime={dataScheduleTimeModal}
        />
          <Modal
            isOpen={checkLogin}
            className={"booking-modal-container"}
            // size="xl"
            centered
            // backdrop={true}
          >
            <div className="modal-header">
                <h5 className="modal-title"><b style={{color:'red'}}>Thông báo</b></h5>
                <button type="button" className="close" aria-label="Close" onClick={()=>this.setState({checkLogin:false})}>
                    <span aria-hidden='true'>×</span>
                </button>
            </div>
            <ModalBody>
            <p><strong>Bạn chưa đăng nhập:</strong> vui lòng đăng nhập để đặt lịch hẹn</p>
            </ModalBody>
            <ModalFooter>
              <Link to={`/login`}>
                <Button color="warning">Login</Button>{' '}
              </Link>
                <Button color="secondary" onClick={()=>this.setState({checkLogin:false})}>Cancel</Button>
            </ModalFooter>
          </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
