import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import {
  postBookAppointment,
  postReCapTCha,
} from "../../../../services/userService";
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
      isReCaptCha: false,
      captchaRef: null,
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
  handleCloseBook = ()=>{
    this.props.closeBooking();
    this.setState({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      isReCaptCha: false,
    });
  }
  handleConfirmBooking = async (e) => {
    e.preventDefault();
    let {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      reason,
      isReCaptCha,
    } = this.state;
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      phoneNumber !== "" &&
      address !== "" &&
      reason !== ""
    ) {
      if (isReCaptCha === false) {
        toast.error("Error: you are not done ReCaptCha !");
      } else {
        let birthday = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        this.setState({ isShowLoading: true });
        let res = await postBookAppointment({
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          address: address,
          reason: reason,
          date: this.props.dataTime.date,
          birthday: birthday,
          selectedGender: this.state.selectedGender.value,
          doctorId: this.props.dataTime.doctorId,
          timeType: this.props.dataTime.timeType,
          language: this.props.language,
          timeString: timeString,
          doctorName: doctorName,
        });
        if (res && res.errCode === 0) {
          this.setState({ isShowLoading: false });
          toast.success("Booking a new appointment succeed!");
          this.props.closeBooking();
          this.setState({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            birthday: "",
            selectedGender: "",
            isReCaptCha: false,
          });
        } else {
          this.setState({ isShowLoading: false });
          toast.error("Booking a new appointment error!");
          this.setState({
            isReCaptCha: false,
          });
        }
      }
    }
    // window.grecaptcha.reset();
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
  handleOnchangeCaptCha = async (e) => {
    let res = await postReCapTCha({
      token:e
    });
    if (res && res.errCode===0 && res.data.success) {
      this.setState({ isReCaptCha: true });
    }  };
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
              <form onSubmit={(e) => this.handleConfirmBooking(e)}>
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
                        required
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
                        required
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
                        required
                        type="tel"
                        pattern="[0]{1}[0-9]{9}"
                        className="form-control inv"
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
                        required
                        type="email"
                        className="form-control inv"
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
                        required
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
                        required
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
                        required
                        value={this.state.selectedGender}
                        onChange={this.handleChangeSelect}
                        options={this.state.genders}
                      />
                    </div>
                    <div className="col-6 form-group">
                      <ReCAPTCHA
                        ref={this.state.captchaRef}
                        sitekey={process.env.REACT_APP_SITE_KEY}
                        onChange={(e) => this.handleOnchangeCaptCha(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="booking-modal-footer">
                  <button
                    className="btn-booking-confirm"
                    type="submit"
                  >
                    <FormattedMessage id="patient.booking-modal.btnConfirm" />
                  </button>
                  <button className="btn-booking-cancel" onClick={() => this.handleCloseBook()}>
                    <FormattedMessage id="patient.booking-modal.btnCancel" />
                  </button>
                </div>
              </div>
              </form>
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
