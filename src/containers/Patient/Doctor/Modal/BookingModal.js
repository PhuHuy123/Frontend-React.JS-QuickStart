import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { postBookAppointment } from "../../../../services/userService";
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import * as actions from "../../../../store/actions";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
import { PayPalButton } from "react-paypal-button-v2";
import Paypal from "../../../Paypal/Paypal";
import ReCAPTCHA from "react-google-recaptcha";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowMarkdown: false,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      doctorId: "",
      genders: "",
      timeType: "",

      payment: "",

      isShowLoading: false,
      isShowPayPay: false,
    };
  }

  async componentDidMount() {
    this.props.getGenders();
    //    this.setState({
    //         isShowPayPay: false
    //    })
  }
  buildDataGender = (data) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }
  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let copyState = { ...this.state };
    copyState[id] = valueInput;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date,
    });
  };
  handleChangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };
  buildTimeBooking = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let { language } = this.props;
      let date =
        language === LANGUAGES.EN
          ? moment(new Date(dataTime.date))
              .locale("en")
              .format("dddd - MM/DD/YYYY")
          : moment(new Date(dataTime.date)).format("dddd - DD/MM/YYYY");
      let time =
        language === LANGUAGES.EN
          ? dataTime.timeTypeData.valueEn
          : dataTime.timeTypeData.valueVi;
      return `${time}  ${date}`;
    }
    return ``;
  };
  buildDoctorName = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let { language } = this.props;
      let name =
        language === LANGUAGES.EN
          ? `${dataTime.doctorData.firstName} - ${dataTime.doctorData.lastName}`
          : `${dataTime.doctorData.lastName} - ${dataTime.doctorData.firstName}`;

      return name;
    }
    return ``;
  };
  handleConfirmBooking = async () => {
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);
    this.setState({ isShowLoading: true });
    let res = await postBookAppointment({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataTime.date,
      birthday: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    if (res && res.errCode === 0) {
      this.setState({ isShowLoading: false });
      toast.success("Booking a new appointment succeed!");
      this.props.closeBooking();
    } else {
      this.setState({ isShowLoading: false });
      toast.error("Booking a new appointment error!");
    }
  };
  handlePayPal = () => {
    this.setState({ isShowPayPay: true });
  };
  handleClosePayPal = (input) => {
    if (input === "back") {
      this.setState({ isShowPayPay: false });
      return;
    }
    this.props.closeBooking();
    this.setState({ isShowPayPay: false });
  };
  handleOnchangeCaptCha = (e) => {
    console.log(e);
  };
  render() {
    let { language } = this.props;
    // toggle cha
    let {
      isShowPayPay,
      payment,
      email,
      lastName,
      firstName,
      phoneNumber,
      address,
      timeType,
      selectedGender,
      reason,
    } = this.state;
    let { isOpenModal, closeBooking, dataTime } = this.props;
    console.log(process.env);
    let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <Modal
            isOpen={isOpenModal}
            className={"booking-modal-container"}
            size="lg"
            centered
            // backdrop={true}
          >
            {isShowPayPay === false ? (
              <div className="booking-modal-content">
                <div className="booking-modal-header">
                  <span className="left">
                    <FormattedMessage id="patient.booking-modal.title" />
                  </span>
                  <span className="right" onClick={closeBooking}>
                    <i className="fas fa-times"></i>
                  </span>
                </div>
                <div className="booking-modal-body">
                  {/* {JSON.stringify(dataTime)} */}
                  <div className="doctor-info">
                    <ProfileDoctor
                      doctorId={doctorId}
                      dataTime={dataTime}
                      isShowMarkdown={this.state.isShowMarkdown}
                      isShowLinkDetail={false}
                      isShowPrice={true}
                    />
                  </div>
                  <div className="row">
                    <div className="col-3 form-group">
                      <label>
                        <FormattedMessage id="patient.booking-modal.firstName" />
                      </label>
                      <input
                        className="form-control"
                        value={this.state.firstName}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "firstName")
                        }
                      />
                    </div>
                    <div className="col-3 form-group">
                      <label>
                        <FormattedMessage id="patient.booking-modal.lastName" />
                      </label>
                      <input
                        className="form-control"
                        value={this.state.lastName}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "lastName")
                        }
                      />
                    </div>
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="patient.booking-modal.phoneNumber" />
                      </label>
                      <input
                        className="form-control"
                        value={this.state.phoneNumber}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "phoneNumber")
                        }
                      />
                    </div>
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="patient.booking-modal.email" />
                      </label>
                      <input
                        className="form-control"
                        value={this.state.email}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "email")
                        }
                      />
                    </div>
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="patient.booking-modal.address" />
                      </label>
                      <input
                        className="form-control"
                        value={this.state.address}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "address")
                        }
                      />
                    </div>
                    <div className="col-12 form-group">
                      <label>
                        <FormattedMessage id="patient.booking-modal.reason" />
                      </label>
                      <input
                        className="form-control"
                        value={this.state.reason}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "reason")
                        }
                      />
                    </div>
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="patient.booking-modal.birthday" />
                      </label>
                      <DatePicker
                        className="form-control"
                        dateFormat={
                          language === LANGUAGES.VI
                            ? "dd/MM/yyyy"
                            : "MM/dd/yyyy"
                        }
                        selected={this.state.birthday}
                        onChange={(date) => this.handleOnchangeDatePicker(date)}
                        value={
                          this.state.birthday === ""
                            ? language === LANGUAGES.VI
                              ? "-- Chọn ngày --"
                              : "-- Choose a date --"
                            : false
                        }
                      />
                    </div>
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="patient.booking-modal.gender" />
                      </label>
                      <Select
                        value={this.state.selectedGender}
                        onChange={this.handleChangeSelect}
                        options={this.state.genders}
                      />
                    </div>
                    {/* <div className="col-6 form-group">
                      <label>
                        <b>Chọn phương thức thanh toán</b>
                      </label>{" "}
                      <br />
                      <input
                        type="radio"
                        value="PAYPAL"
                        name="PAYMENT"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "payment")
                        }
                      />{" "}
                      Thanh toán bằng Paypal
                      <br />
                      <input
                        type="radio"
                        value="MONEY"
                        name="PAYMENT"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "payment")
                        }
                      />{" "}
                      Thanh toán bằng tiền mặt
                    </div> */}
                    <div className="col-6 form-group">
                      <ReCAPTCHA
                        sitekey="6LeNF3kiAAAAAAP1h_7FnCN99R5ipS-2hDYLRTEs"
                        onChange={(e) => this.handleOnchangeCaptCha(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="booking-modal-footer">
                  {payment && payment === "PAYPAL" ? (
                    <button
                      className="btn-booking-confirm"
                      onClick={() => this.handlePayPal()}
                    >
                      Thanh toán
                    </button>
                  ) : (
                    <button
                      className="btn-booking-confirm"
                      onClick={() => this.handleConfirmBooking()}
                    >
                      <FormattedMessage id="patient.booking-modal.btnConfirm" />
                    </button>
                  )}
                  <button className="btn-booking-cancel" onClick={closeBooking}>
                    <FormattedMessage id="patient.booking-modal.btnCancel" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="booking-modal-content">
                <div className="booking-modal-header">
                  <span className="left">Thanh toán</span>
                  <span
                    className="right"
                    onClick={() => this.handleClosePayPal("back")}
                  >
                    <i className="fas fa-times"></i>
                  </span>
                </div>
                <Paypal
                  doctorId={doctorId}
                  firstName={firstName}
                  lastName={lastName}
                  phoneNumber={phoneNumber}
                  email={email}
                  address={address}
                  reason={reason}
                  date={this.props.dataTime.date}
                  // birthday= {birthday}
                  selectedGender={selectedGender}
                  timeType={timeType}
                  closePayPal={() => this.handleClosePayPal()}
                />
              </div>
            )}
          </Modal>
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
