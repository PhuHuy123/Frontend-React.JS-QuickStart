import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, dateFormat, USER_ROLE } from "../../../utils";
import Select from "react-select";
import * as actions from "../../../store/actions";
// import DatePicker from '../../../components/Input/DatePicker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import RemedyModal from "./RemedyModal";
import CancelModal from "./CancelModal";
import ForwardModal from "./ForwardModal";
import LoadingOverlay from "react-loading-overlay";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: {},
      listDoctors: "",
      startDate: "",
      dataPatient: [],
      isOpenRemedyModal: false,
      isOpenCancelModal: false,
      dataModal: {},
      isShowLoading: false,
      isOpenForwardModal: false,
    };
  }
  async componentDidMount() {
    this.getDataPatient();
    this.props.fetAllDoctorsRedux();
  }
  handleChange = async (selectedDoctor) => {
    console.log('selectedDoctor', selectedDoctor);
    this.setState(
      {
        selectedDoctor,
        doctorId: selectedDoctor.value,
      }
    );
  };
  getDataPatient = async () => {
    let { userInfo } = this.props;
    let { startDate } = this.state;
    let formattedDate = "ALL";
    if (startDate !== "") {
      formattedDate = moment(startDate).format("YYYY-MM-DD");
    }
    let res = await getAllPatientForDoctor({
      doctorId: userInfo?.roleId === USER_ROLE.ADMIN? 'ALL' : userInfo.id,
      date: formattedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({ dataPatient: res.data });
    }
  };
  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let valueVi = `${item.lastName} ${item.firstName}`;
        let valueEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? valueVi : valueEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.startDate !== this.state.startDate) {
      this.getDataPatient();
    }
    if (prevProps.arrDoctors !== this.props.arrDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.arrDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.arrDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }
  handleDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
//   handleBtnConfirm = (item) => {
//     let data = item;
//     this.setState({
//       isOpenRemedyModal: true,
//       dataModal: data,
//     });
//   };
  handleBtnRemedy = (item, type) => {
    let data = item;
    this.setState({
        [type]: true,
      dataModal: data,
    });
  };
  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      isOpenCancelModal: false,
      isOpenForwardModal:false,
      dataModal: {},
    });
  };
  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({ isShowLoading: true });
    if (dataModal) {
      let res = await postSendRemedy({
        doctorId: dataModal.doctorId,
        bookingId: dataModal.bookingId,
        timeType: dataModal.timeType,
        language: this.props.language,
        comment: dataChild.comment,
        price: dataChild.price,
        name: dataChild.name,
      });
      if (res && res.errCode === 0) {
        this.setState({
          isShowLoading: false,
        });
        toast.success("send Remedy successfully");
        this.closeRemedyModal();
        await this.getDataPatient();
      } else {
        this.setState({
          isShowLoading: false,
        });
        toast.error("Error send Remedy...");
      }
    }
  };
  render() {
    let { language, userInfo } = this.props;
    let { dataPatient, isOpenRemedyModal, dataModal, isOpenCancelModal, isOpenForwardModal } =
      this.state;
      console.log(this.state.dataPatient);
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="manage-patient-container">
            <div className="m-s-title">Quản lý bệnh nhân khám bệnh</div>
            <div className="container">
              <div className="row">
              {userInfo && userInfo.roleId === USER_ROLE.ADMIN && (
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={()=>this.handleChange()}
                  options={this.state.listDoctors}
                  placeholder={language === LANGUAGES.VI ? '---Chọn bác sĩ---' : '---Choose a doctor---'}
                />
              </div>
            )}
                <div className="col-4 form-group">
                  <label>Chọn ngày khám</label>
                  <DatePicker
                    className="form-control"
                    dateFormat={
                      language === LANGUAGES.VI ? "dd/MM/yyyy" : "MM/dd/yyyy"
                    }
                    selected={this.state.startDate}
                    onChange={(date) => this.handleDateChange(date)}
                    value={
                      this.state.startDate === ""
                        ? language === LANGUAGES.VI
                          ? "-- Chọn ngày --"
                          : "-- Choose a date --"
                        : false
                    }
                  />
                </div>
                <div className="col-4 form-group">
                  <button
                    className="btn btn-primary btn-all"
                    onClick={() => {
                      this.setState({ startDate: "" });
                    }}
                  >
                    Tất cả
                  </button>
                </div>
                <table className="table table-bordered mt-3">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Họ và tên</th>
                      <th scope="col">Giới tính</th>
                      <th scope="col">Thời gian</th>
                      <th scope="col">Ngày</th>
                      <th scope="col">Số điện thoại</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient
                        .slice(0)
                        .reverse()
                        .map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>
                                {language === LANGUAGES.VI
                                  ? `${item.dataBooking.lastName} ${item.dataBooking.firstName}`
                                  : `${item.dataBooking.firstName} ${item.dataBooking.lastName}`}
                              </td>
                              <td>
                                {language === LANGUAGES.VI
                                  ? item.dataBooking.genderData2.valueVi
                                  : item.dataBooking.genderData2.valueEn}
                              </td>
                              <td>
                                {language === LANGUAGES.VI
                                  ? item.timeTypeDataExamination.valueVi
                                  : item.timeTypeDataExamination.valueEn}
                              </td>
                              <td>
                                {language === LANGUAGES.VI
                                  ? moment(item.date).format("DD-MM-YYYY")
                                  : moment(item.date).format("MM-DD-YYYY")}
                              </td>
                              <td>{item.dataBooking.phoneNumber}</td>
                              {item.statusId === "S0" ? (
                                <td className="s0">
                                  <span>Đã hủy</span>
                                </td>
                              ) : item.statusId === "S2" ? (
                                <td className="s2">
                                  <span>Đang tiến hành</span>
                                </td>
                              ) : item.statusId === "S3" ? (
                                <td className="s3">
                                  <span>Hoàn thành</span>
                                </td>
                              ) : (
                                "Đã hủy"
                              )}
                              <td>
                                <button
                                  className="mp-btn-confirm"
                                  onClick={() => this.handleBtnRemedy(item, "isOpenRemedyModal")}
                                >
                                  <i className="fa-solid fa-eye"></i>
                                </button>
                                {item.statusId === "S2" && (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => this.handleBtnRemedy(item, "isOpenCancelModal")}
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                )}
                                {item.statusId === "S3" && (
                                  <button
                                    className="btn btn-warning"
                                    onClick={() => this.handleBtnRemedy(item, "isOpenForwardModal")}
                                  >
                                    <i className="fa-solid fa-forward pt-1"></i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          No data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {isOpenRemedyModal && (
            <RemedyModal
              isOpenModal={isOpenRemedyModal}
              dataModal={dataModal}
              closeRemedyModal={this.closeRemedyModal}
              sendRemedy={this.sendRemedy}
            />
          )}
          {isOpenCancelModal && (
            <CancelModal
              isOpenModal={isOpenCancelModal}
              dataModal={dataModal}
              closeCancelModal={this.closeRemedyModal}
              sendRemedy={this.getDataPatient}
            />
          )}
          {isOpenForwardModal && (
            <ForwardModal
              isOpenModal={isOpenForwardModal}
              dataModal={dataModal}
              closeRemedyModal={this.closeRemedyModal}
            />
          )}
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
    arrDoctors: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
