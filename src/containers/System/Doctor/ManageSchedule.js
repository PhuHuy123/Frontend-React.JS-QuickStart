import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, USER_ROLE } from "../../../utils";
import Select from "react-select";
import * as actions from "../../../store/actions";
// import DatePicker from '../../../components/Input/DatePicker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import {
  bulkCreateSchedule,
  getScheduleDoctorByDate,
} from "../../../services/userService";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: {},
      listDoctors: "",
      chooseDate: "",
      rangeTime: [],
      doctorId: "",
      maxNumber: "",
      startDate: "",
      endDate: "",
      arrayDate: [],
    };
  }
  componentDidMount() {
    this.props.fetAllDoctorsRedux();
    this.props.fetchAllScheduleTime();
  }
  handleChange = async (selectedDoctor) => {
    this.setState(
      {
        selectedDoctor,
        doctorId: selectedDoctor.value,
      },
      () => {
        this.handleDateChange(this.state.chooseDate);
      }
    );
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
    if (prevProps.arrDoctors !== this.props.arrDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.arrDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTimes !== this.props.allScheduleTimes) {
      let data = this.props.allScheduleTimes;
      if (data && data.length > 0) {
        data = data.map((item) => ({
          ...item,
          isSelected: false,
        }));
      }
      this.setState({
        rangeTime: data,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.arrDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevState.endDate !== this.state.endDate) {
      this.handleCalculateDate();
    }
    if (prevState.startDate !== this.state.startDate) {
      this.handleCalculateDate();
    }
  }
  handleDateChange = async (dateTime) => {
    let { userInfo } = this.props;
    let { doctorId } = this.state;
    if (userInfo && userInfo.roleId === USER_ROLE.DOCTOR) {
      doctorId = userInfo.id;
    }
    let data = this.props.allScheduleTimes;
    let dt = new Date(+dateTime);
    let date = moment(dt).format("YYYY-MM-DD");
    if (doctorId) {
      if (data && data.length > 0) {
        data = data.map((item) => ({
          ...item,
          isSelected: false,
        }));
      }
      let res = await getScheduleDoctorByDate(doctorId, date);
      console.log("1111", res);
      if (res && res.errCode === 0) {
        if (res.data && res.data.length > 0) {
          let check = res.data.map((item) => item.timeType);
          if (data && data.length > 0) {
            data = data.map((item) =>
              check.some((element) => element === item.keyMap)
                ? {
                    ...item,
                    isSelected: true,
                  }
                : {
                    ...item,
                    isSelected: false,
                  }
            );
          }
        }
      }
    }
    this.setState({
      chooseDate: dateTime,
      rangeTime: data,
    });
  };
  handleClickTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) {
          item.isSelected = !time.isSelected;
        }
        return item;
      });
      this.setState({ rangeTime });
    }
  };
  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, startDate, maxNumber, arrayDate } =
      this.state;
    let { userInfo } = this.props;
    let result = [];
    // let formatData =  moment(startDate).format(dateFormat.SEND_TO_SERVER)
    let formatData = new Date(startDate).getTime();
    if (userInfo && userInfo.roleId === USER_ROLE.DOCTOR) {
      selectedDoctor.label = "";
      selectedDoctor.value = userInfo.id;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid choose doctor !");
      return;
    }
    if (!startDate) {
      toast.error("Invalid start date!");
      return;
    }
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((item) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          //   object.date = formatData;
          object.timeType = item.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid time has not been selected!");
        return;
      }
      let data = this.props.allScheduleTimes;
      if (data && data.length > 0) {
        data = data.map((item) => ({
          ...item,
          isSelected: false,
        }));
      }
      this.setState({
        // listDoctors:'',
        startDate: "",
        rangeTime: data,
      });
    }
    // console.log(result);
    // console.log(selectedDoctor.value);
    // console.log(formatData);
    console.log(arrayDate);
    let res = await bulkCreateSchedule({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatData: arrayDate,
      maxNumber: maxNumber,
    });
    if (res && res.errCode === 0) {
      toast.success("Save info successfully!");
    } else {
      toast.error("Error cannot save information!");
    }
  };
  handleStartDate = (dateTime) => {
    this.setState({
      startDate: dateTime,
    });
  };
  handleEndDate = (dateTime) => {
    this.setState({
      endDate: dateTime,
    });
  };
  handleCalculateDate = () => {
    let { startDate, endDate } = this.state;
    let startDay = new Date(+startDate);
    let endDay = new Date(+endDate);
    let end = moment(endDay).format("YYYY-MM-DD");
    let start = moment(startDay).format("YYYY-MM-DD");
    let arrDay = [];
    if (startDate !== "" && endDate !== "") {
      if (end !== start) {
        while (end !== start) {
          start = moment(startDay).format("YYYY-MM-DD");
          arrDay.push(new Date(startDay).getTime());
          startDay.setDate(startDay.getDate() + 1);
        }
        this.setState({
          arrayDate: arrDay,
        });
      }
    } else {
      if (startDate !== "") {
        arrDay.push(new Date(startDay).getTime());
        this.setState({
          arrayDate: arrDay,
        });
      }
    }
  };
  handleOnChangeInput = (event, id) => {
    console.log(event);
    let valueInput = event.target.value;
    let copyState = { ...this.state };
    copyState[id] = valueInput;
    this.setState({
      ...copyState,
    });
  };
  render() {
    let { language, userInfo } = this.props;
    let { rangeTime, endDate, startDate, maxNumber } = this.state;
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            {userInfo && userInfo.roleId === USER_ROLE.ADMIN && (
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleChange}
                  options={this.state.listDoctors}
                />
              </div>
            )}
            <div className="col-6">
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                className="form-control"
                dateFormat={
                  language === LANGUAGES.VI ? "dd/MM/yyyy" : "MM/dd/yyyy"
                }
                selected={this.state.chooseDate}
                onChange={(date) => this.handleDateChange(date)}
                minDate={new Date()}
                value={
                  this.state.chooseDate === ""
                    ? language === LANGUAGES.VI
                      ? "-- Chọn ngày --"
                      : "-- Choose a date --"
                    : false
                }
              />

              <div className="datePicker">
                <DatePicker
                  value={
                    startDate === ""
                      ? language === LANGUAGES.VI
                        ? "-- Từ ngày --"
                        : "-- Choose a date --"
                      : false
                  }
                  minDate={new Date()}
                  selected={startDate}
                  dateFormat={
                    language === LANGUAGES.VI ? "dd/MM/yyyy" : "MM/dd/yyyy"
                  }
                  onChange={(date) => this.handleStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
                <DatePicker
                  selected={endDate}
                  value={
                    endDate === ""
                      ? language === LANGUAGES.VI
                        ? "-- Đến ngày --"
                        : "-- Choose a date --"
                      : false
                  }
                  dateFormat={
                    language === LANGUAGES.VI ? "dd/MM/yyyy" : "MM/dd/yyyy"
                  }
                  onChange={(date) => this.handleEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
                <input
                  type="text"
                  placeholder="Số bệnh nhân"
                  value={maxNumber}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "maxNumber")
                  }
                />
              </div>
            </div>
            <div className="col-12 pick-hour">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={
                        item.isSelected === true
                          ? "btn btn-warning m-2 p-2"
                          : "btn m-2 p-2"
                      }
                      onClick={() => this.handleClickTime(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary"
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id="manage-schedule.save-info" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    arrDoctors: state.admin.allDoctors,
    userInfo: state.user.userInfo,
    allScheduleTimes: state.admin.allScheduleTimes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
