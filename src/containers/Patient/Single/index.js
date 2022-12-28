import * as React from "react";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { LANGUAGES } from "../../../utils";
import HomeHeader from "../../HomePage/HomeHeader";
import { Link } from "react-router-dom";
import "./Single.scss";
import {
  getBookingSingleId,
  getCancelBook,
} from "../../../services/userService";
import moment from "moment";
import { Modal, Button, ModalBody, ModalFooter } from "reactstrap";
import Cancal from "./Cancal";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { useMediaQuery } from 'react-responsive'

const Single = (props) => {
  const steps = [
    "Lịch khám vừa đăng ký",
    "Xác nhận lịch khám",
    "Đã hoàn thành",
  ];
  const [currentStep, setCurrentStep] = useState();
  const [dataBook, setDataBook] = useState();
  const [dataDoctor, setDataDoctor] = useState("");
  const [gender, setGender] = useState();
  const [checkDelete, setCheckDelete] = useState(false);
  const isTablet = useMediaQuery({ query: '(max-width: 1062px)' })
  const isMobi = useMediaQuery({ query: '(max-width: 768px)' })
  const isIphone = useMediaQuery({ query: '(max-width: 414px)' })
  

  useEffect(() => {
    handleSingleById();
  }, []);
  const handleSingleById = async () => {
    let res = await getBookingSingleId(props.userInfo.id);
    console.log(res?.data);
    if (res && res.errCode === 0 && res.data) {
      setCurrentStep(res.data[0]);
      setDataBook(res?.data[0]?.dataBooking[0]);
      setDataDoctor(res?.data[0]?.dataBooking[0]?.dataDoctor);
      setGender(res.data[0]?.genderData2);
    }
  };
  const handleCancelBook = async () => {
    let res = await getCancelBook(dataBook.bookingId);
    if (res && res.errCode === 0) {
      toast.success("Successfully canceled appointment!");
      handleSingleById();
    } else {
      toast.error("Canceling the appointment is a failure!");
    }
    setCheckDelete(false);
  };
  return (
    <div className={isTablet ?"single-case-tablet":"single-case"}>
      <HomeHeader />
      <div className={!isTablet ? "container":"al"}>
        <div className="row">
          {!isTablet &&
            <div className="nav-left col-2">
              <div className="navBar-info">
                <Link to="/info-patient">
                  <p>
                    <i className="fa fa-user" aria-hidden="true"></i> <FormattedMessage id="navbar.personal-information" />
                  </p>
                </Link>
                <Link to="/single">
                  <p style={{ color: "blue" }}>
                    <i className="fa fa-file" aria-hidden="true"></i> <FormattedMessage id="navbar.medical-order" />
                  </p>
                </Link>
                <Link to="/history">
                  <p>
                    <i className="fa fa-history" aria-hidden="true"></i> <FormattedMessage id="navbar.medical-history" />
                  </p>
                </Link>
              </div>
            </div>
          }
          {currentStep && (
            <div className={isTablet ?"nav-right col-12":"nav-right col-10"}>
              {currentStep && currentStep.statusId === "S4" ? (
                <Cancal />
              ) : (
                <Box sx={{ width: "100%" }}>
                  <Stepper
                    activeStep={
                      currentStep && currentStep.statusId === "S1"
                        ? 1
                        : currentStep.statusId === "S2"
                        ? 2
                        : currentStep.statusId === "S3"
                        ? 3
                        : 0
                    }
                    alternativeLabel
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              )}
              <div className="content-single">
                <h6>Thông tin đơn đặt khám: </h6>
                <ul className="row">
                  <p className="col-6">
                    <b>Bác sĩ: </b>
                    {props.language === LANGUAGES.VI
                      ? dataDoctor &&
                        `${dataDoctor.lastName} ${dataDoctor.firstName}`
                      : dataDoctor &&
                        `${dataDoctor.firstName} ${dataDoctor.lastName}`}
                  </p>
                  <p className="col-6">
                    <b>Chuyên khoa:</b>{" "}
                    {dataDoctor && dataDoctor.DoctorInfo.specialtyData.name}
                  </p>
                  <p className="col-6">
                    <b>Ngày khám:</b>{" "}
                    {props.language === LANGUAGES.VI
                      ? moment(dataBook ? dataBook.date : 0).format(
                          "DD-MM-YYYY"
                        )
                      : moment(dataBook ? dataBook.date : 0).format(
                          "MM-DD-YYYY"
                        )}
                  </p>
                  <p className="col-6">
                    <b>Giờ khám:</b>{" "}
                    {props.language === LANGUAGES.VI
                      ? dataBook && dataBook.timeTypeDataExamination.valueVi
                      : dataBook && dataBook.timeTypeDataExamination.valueEn}
                  </p>
                  <p className="col-12">
                    <b>Giá khám: </b>0 -{" "}
                    {props.language === LANGUAGES.VI
                      ? dataDoctor &&
                        `${dataDoctor.DoctorInfo.priceTypeData.valueVi} VNĐ`
                      : dataDoctor &&
                        `${dataDoctor.DoctorInfo.priceTypeData.valueEn} $`}
                  </p>
                  <div className="col-6">
                    <b>Khám tại:</b>
                    <p>{dataDoctor && dataDoctor.DoctorInfo.nameClinic}</p>
                  </div>
                  <div className="col-6">
                    <b>Địa chỉ cụ thể:</b>
                    <p>{dataDoctor && dataDoctor.DoctorInfo.addressClinic}</p>
                  </div>
                  <div className="col-6">
                    <b>Lý do khám:</b>
                    <p>{dataBook && dataBook.reason}</p>
                  </div>
                </ul>
                <h6>Thông tin người đặt: </h6>
                <ul className="row">
                  <p className="col-12">
                    <b>Email đăng ký:</b> {currentStep.email}
                  </p>
                  <p className="col-5">
                    <b>Họ và tên: </b>
                    {props.language === LANGUAGES.VI
                      ? currentStep &&
                        `${currentStep.lastName} ${currentStep.firstName}`
                      : currentStep &&
                        `${currentStep.firstName} ${currentStep.lastName}`}
                  </p>
                  <p className="col-6">
                    <b>Số điện thoại:</b> {currentStep.phoneNumber}
                  </p>
                  <p className="col-5">
                    <b>Ngày sinh:</b>{" "}
                    {props.language === LANGUAGES.VI
                      ? moment(currentStep.birthday).format("DD-MM-YYYY")
                      : moment(currentStep.birthday).format("MM-DD-YYYY")}
                  </p>
                  <p className="col-5">
                    <b>Giới tính: </b>
                    {props.language === LANGUAGES.VI
                      ? gender && gender.valueVi
                      : gender && gender.valueEn}
                  </p>
                  <p className="col-12">
                    <b>Địa chỉ:</b> {currentStep.address}
                  </p>
                  {currentStep && currentStep.statusId === "S4" ? (
                    <></>
                  ) : (
                    <button
                      type="button"
                      className={isTablet ?"btn btn-outline-danger col-11" : "btn btn-outline-danger col-10"}
                      onClick={() => setCheckDelete(true)}
                    >
                      Hủy lịch khám
                    </button>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={checkDelete}
        className={"booking-modal-container"}
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title">
            <b style={{ color: "red" }}>Thông báo</b>
          </h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => setCheckDelete(false)}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <ModalBody>
          <p style={{ textAlign: "center" }}>
            <strong>Bạn:</strong> muốn hủy lịch khám này
          </p>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-danger" onClick={handleCancelBook}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={() => setCheckDelete(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

export default connect(mapStateToProps)(Single);
