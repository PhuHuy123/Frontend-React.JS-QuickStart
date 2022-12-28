import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";
import Select from "react-select";
import * as actions from "../../../store/actions";
import {
  getDetailClinicById,
  getScheduleDoctorByDate,
  createExamination,
  postDoctorForward,
} from "../../../services/userService";
class ForwardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSpecialty: "",
      listSpecialty: "",
      selectedDoctor: "",
      listDoctor: "",
      doctorClinic: "",
      allAvailableTime: "",
      typeTimeDoctor: "",
      isCheck: false,
      dataForward: "",
      reason: "",
    };
  }

  async componentDidMount() {
    this.props.fetAllDoctorsRedux();
    this.props.fetchRequiredDoctorInfo();
    let res = await getDetailClinicById({
      id: this.props.dataModal.dataDoctor.DoctorInfo.clinicId,
    });
    if (res && res.errCode === 0) {
      this.setState({
        doctorClinic: res.data.doctorClinic,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }

    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let arrSpecialty = this.props.allRequiredDoctorInfo.resSpecialty;
      let result = [];
      if (arrSpecialty && arrSpecialty.length > 0) {
        arrSpecialty.map((item) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
      this.setState({ listSpecialty: result });
    }
    if (prevState.doctorClinic !== this.state.doctorClinic) {
      let arrDoctor = this.props.arrDoctors;
      let { doctorClinic, listDoctor } = this.state;
      let doctor = [];
      if (arrDoctor && arrDoctor.length > 0) {
        arrDoctor.map((item) => {
          let object = {};
          let valueVi = `${item.lastName} ${item.firstName}`;
          let valueEn = `${item.firstName} ${item.lastName}`;
          object.label =
            this.props.language === LANGUAGES.VI ? valueVi : valueEn;
          object.value = item.id;
          doctor.push(object);
        });
      }
      let result = [];
      if (doctorClinic && doctorClinic.length > 0) {
        doctorClinic.map((item) => {
          let object = doctor.filter((loc) => loc.value === item.doctorId);
          result.push(Object.assign({}, object[0]));
        });
      }
      this.setState({ listDoctor: result, typeTimeDoctor: result });
      this.handlerListArrayTimeType(result);
    }
  }
  handlerListArrayTimeType = (data) => {
    let date = moment(new Date()).format("YYYY-MM-DD");
    let timeType = [];
    data.map(async (item) => {
      let res = await getScheduleDoctorByDate(item.value, date);
      if (res && res.data) {
        timeType.push(res.data);
        this.setState({
          allAvailableTime: timeType,
        });
      }
    });
  };
  handlerSendRemedy = async () => {
    let { dataForward, reason } = this.state;
    let { dataModal } = this.props;
    if (!dataForward || !dataModal) {
      return;
    }
    let res = await createExamination({
      bookingId: dataModal.bookingId,
      doctorId: dataForward.doctorId,
      timeType: dataForward.timeType,
      date: dataForward.date,
      reason: reason,
    });
    if (res && res.errCode === 0) {
      toast.success("Forward successfully");
      this.props.closeRemedyModal();
    } else {
      toast.error("Error send Forward...");
    }
  };
  handlerOnChangeReason = (e) => {
    this.setState({
      reason: e.target.value,
    });
  };
  handleChangeSelectDoctorInfo = (e) => {
    this.handlerListArrayTimeType([e]);
    this.setState({
      selectedDoctor: e,
    });
  };
  handleChangeSelectSpecialty = async (e) => {
    let clinicId = this.props.dataModal.dataDoctor.DoctorInfo.clinicId;
    let specialtyId = e.value;
    let res = await postDoctorForward({
      clinicId: clinicId,
      specialtyId: specialtyId,
    });
    let result = [];
    res.data.map((item) => {
      let i = {};
      i.value = item.doctorId;
      if (this.props.language === LANGUAGES.VI) {
        i.label = `${item.User?.lastName} ${item.User?.firstName}`;
      } else {
        i.label = `${item.User?.firstName} ${item.User?.lastName}`;
      }
      result.push(i);
    });
    this.setState({
      selectedSpecialty: e,
      allAvailableTime: "",
      selectedDoctor: "",
    });
    this.handlerListArrayTimeType(result);
  };
  handleClickScheduleTime = (e) => {
    this.setState({
      isCheck: true,
      dataForward: e,
    });
  };
  handleClose = () => {
    if (this.state.isCheck) {
      this.setState({ isCheck: false });
    } else {
      this.props.closeRemedyModal();
    }
  };
  render() {
    let {
      isCheck,
      selectedSpecialty,
      listSpecialty,
      listDoctor,
      selectedDoctor,
      allAvailableTime,
      dataForward,
    } = this.state;
    let { language, isOpenModal, closeRemedyModal, dataModal } = this.props;
    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size={isCheck ? "" : "lg"}
        centered
        // backdrop={true}
      >
        <div className="modal-header">
          <h5 className="modal-title">Patient transfer</h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={closeRemedyModal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <ModalBody>
          {!isCheck ? (
            <div className="row">
              <div className="col-6 px-5 form-group">
                <label>Chọn chuyên khoa</label>
                <Select
                  value={selectedSpecialty}
                  onChange={(e) => this.handleChangeSelectSpecialty(e)}
                  options={listSpecialty}
                  placeholder={"---Chọn chuyên khoa---"}
                  name="selectedSpecialty"
                />
              </div>
              <div className="col-6 form-group">
                <label>Chọn bác sĩ</label>
                <Select
                  value={selectedDoctor}
                  onChange={(e) => this.handleChangeSelectDoctorInfo(e)}
                  options={listDoctor}
                  placeholder={"---Chọn bác sĩ---"}
                  name="selectedDoctor"
                />
              </div>
              <div className="col-12 form-group">
                {allAvailableTime.length > 0 ? (
                  allAvailableTime.map((item, index) => {
                    let ret = item.map((e) => {
                      let timeDisplay =
                        language === LANGUAGES.VI
                          ? e.timeTypeData.valueVi
                          : e.timeTypeData.valueEn;
                      return (
                        <button
                          key={e.id}
                          className={
                            language === LANGUAGES.VI
                              ? "btn-time-vi"
                              : "btn-time-en"
                          }
                          onClick={() => this.handleClickScheduleTime(e)}
                        >
                          {timeDisplay}
                        </button>
                      );
                    });
                    return (
                      <div key={index} className="time_content_doctor">
                        {item[0] && (
                          <h5>
                            <strong>
                              {language === LANGUAGES.VI
                                ? `${item[0].doctorData.lastName} ${item[0].doctorData.firstName}`
                                : `${item[0].doctorData.firstName} ${item[0].doctorData.lastName}`}
                            </strong>
                          </h5>
                        )}
                        {ret}
                      </div>
                    );
                  })
                ) : (
                  <div className="attention">
                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              {dataForward !== "" && (
                <>
                  <p>
                    <strong>Bác sĩ: </strong>
                    {language === LANGUAGES.VI
                      ? `${dataForward.doctorData.lastName} ${dataForward.doctorData.firstName}`
                      : `${dataForward.doctorData.firstName} ${dataForward.doctorData.lastName}`}
                  </p>
                  <p>
                    <strong>Tên bệnh nhân: </strong>
                    {language === LANGUAGES.VI
                      ? `${dataModal.dataBooking.lastName} ${dataModal.dataBooking.firstName}`
                      : `${dataModal.dataBooking.firstName} ${dataModal.dataBooking.lastName}`}
                  </p>
                  <p>
                    <strong>Ngày: </strong>
                    {language === LANGUAGES.VI
                      ? moment(dataForward.date).format("DD-MM-YYYY")
                      : moment(dataForward.date).format("YYYY-MM-DD")}
                  </p>
                  <p>
                    <strong>Thời gian: </strong>
                    {language === LANGUAGES.VI
                      ? dataForward.timeTypeData.valueVi
                      : dataForward.timeTypeData.valueEn}
                  </p>
                  <strong>Lý do: </strong>
                  <textarea
                    type="text"
                    onChange={(e) => this.handlerOnChangeReason(e)}
                  ></textarea>
                </>
              )}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          {isCheck && (
            <Button color="primary" onClick={() => this.handlerSendRemedy()}>
              Send
            </Button>
          )}
          <Button color="secondary" onClick={() => this.handleClose()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    arrDoctors: state.admin.allDoctors,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    fetchRequiredDoctorInfo: () => dispatch(actions.fetchRequiredDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForwardModal);
