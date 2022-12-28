import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
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
  deleteSchedule,
  getScheduleDoctorALL
} from "../../../services/userService";
import Delete from "../../Modal/Delete"
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
      arrData:'',
      isOpenModal:false,
      id: '',
      isModalDelete: false,
      isEdit: false,
    };
  }
  componentDidMount() {
    this.props.fetAllDoctorsRedux();
    this.props.fetchAllScheduleTime();
    this.getScheduleAll();
    
  }
  getScheduleAll=async()=>{
    let { userInfo } = this.props;
    let { doctorId } = this.state;
    if (userInfo && userInfo.roleId === USER_ROLE.DOCTOR) {
      doctorId= userInfo.id
    }
    if (userInfo && userInfo.roleId === USER_ROLE.ADMIN) {
      doctorId= 'ALL'
    }
    let res = await getScheduleDoctorALL(doctorId);
    if(res && res.errCode ===0){
        this.setState({
            arrData: res.data,
        });
      }
  }
  handleChange = async (selectedDoctor) => {
    this.setState(
      {
        selectedDoctor,
        doctorId: selectedDoctor.value,
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
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.doctorId !== this.state.doctorId) {
      let res = await getScheduleDoctorALL(this.state.doctorId);
      if(res && res.errCode ===0){
          this.setState({
              arrData: res.data,
          });
        }
    }
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
    let dt =new Date(+dateTime);
    let date = moment(dt).format("YYYY-MM-DD")
    if (doctorId) {
      if (data && data.length > 0) {
        data = data.map((item) => ({
          ...item,
          isSelected: false,
        }));
      }
      let res = await getScheduleDoctorByDate(doctorId, date);
      this.setState({
        arrData: res.data,
      });
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
      startDate: "",
      endDate:"",
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
  handleSaveSchedule = async (e) => {
    e?.preventDefault();
    let { rangeTime, selectedDoctor, startDate, maxNumber, arrayDate, chooseDate } = this.state;
    let { userInfo } = this.props;
    let result = [];
    // let formatData =  moment(startDate).format(dateFormat.SEND_TO_SERVER)
    // let formatData = new Date(startDate).getTime();
    if (userInfo && userInfo.roleId === USER_ROLE.DOCTOR) {
      selectedDoctor.label = "";
      selectedDoctor.value = userInfo.id;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error(this.props.language === LANGUAGES.VI? "Chọn bác sĩ không hợp lệ!":"Invalid choose doctor !");
      return;
    }
    if (!startDate && !chooseDate) {
      toast.error(this.props.language === LANGUAGES.VI? "Ngày bắt đầu không hợp lệ!":"Invalid start date!");
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
        toast.error(this.props.language === LANGUAGES.VI? "Thời gian không hợp lệ chưa được chọn!":"Invalid time has not been selected!");
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
    if(arrayDate && arrayDate.length === 0){
      let arrDay = [];
      let startDay = new Date(+chooseDate);
      arrDay.push(new Date(startDay).getTime());
      arrayDate= arrDay;
;
    }
    let res = await bulkCreateSchedule({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatData: arrayDate,
      maxNumber: maxNumber,
    });
    this.setState({
      arrayDate:[],
      endDate:'',
      maxNumber:'',
    })
    if (res && res.errCode === 0) {
      toast.success(this.props.language === LANGUAGES.VI?"Lưu thông tin thành công":"Save info successfully!");
    } else {
      toast.error(this.props.language === LANGUAGES.VI?"Lỗi không lưu được thông tin!":"Error cannot save information!");
    }
  };
  handleStartDate = (dateTime) => {
    this.setState({
      startDate: dateTime,
      chooseDate:'',
    });
  };
  handleEndDate = (dateTime) => {
    this.setState({
      endDate: dateTime,
      chooseDate:'',
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
    let valueInput = event.target.value;
    let copyState = { ...this.state };
    copyState[id] = valueInput;
    this.setState({
      ...copyState,
    });
  };
  handleEdit = (data)=>{
    this.setState({
      isOpenModal: true,
      isEdit: true,
      maxNumber: data.maxNumber,
    },()=>{
      this.handleDateChange(new Date(data.date))
    })
  }
  handleModalDelete = (id) =>{
    this.setState({
        id,
        isModalDelete: true,
    })
}
  handleDelete = async()=>{
    try {
      let res =  await deleteSchedule({id: this.state.id});
      if(res && res.errCode!==0){
          toast.error(res.message);
        }
        else{
          toast.success(this.props.language === LANGUAGES.VI?"Xóa dữ liệu thành công":"Delete successfully!");
          if(this.state.chooseDate){
            this.handleDateChange(this.state.chooseDate)
          }
          else{
            this.getScheduleAll();
          }
      }
      this.setState({
        id: '',
        isModalDelete: false,
    })
  } catch (e) {
      console.log(e)
  }
  }
  render() {
    let { language, userInfo } = this.props;
    let { isEdit, rangeTime, endDate, startDate, maxNumber, arrData, isOpenModal, numberAll, isModalDelete } = this.state;
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
                  placeholder={language === LANGUAGES.VI ? '---Chọn bác sĩ---' : '---Choose a doctor---'}
                />
              </div>
            )}
            <div className="col-4">
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
                // minDate={new Date()}
                value={
                  this.state.chooseDate === ""
                    ? language === LANGUAGES.VI
                      ? "-- Chọn ngày --"
                      : "-- Choose a date --"
                    : false
                }
              />
              <button type="button" style={{marginTop:'28px'}} className="btn btn-success form-control col-4"
                onClick={()=>this.setState({isOpenModal:true})}
              ><i className="fa-solid fa-plus" style={{marginLeft:'-10px', marginRight:'5px'}}></i><FormattedMessage id="manage.add-new" /></button>
              </div>
              <button type="button" style={{marginTop:'28px'}} className="btn btn-primary form-control col-1"
                onClick={()=>this.getScheduleAll()}
              ><FormattedMessage id="manage.all" /></button>
            <Modal
              isOpen= {isOpenModal}
              className={"booking-modal-container"}
              size="lg"
              centered
              // backdrop={true}
            >
              <div className="modal-header">
                <h5 className="modal-title"><strong><FormattedMessage id="manage.add-new-appointment"/></strong></h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={()=>this.setState(
                    { isOpenModal:false,
                      isEdit:false,
                  })}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <ModalBody>
                <form onSubmit={(e) => this.handleSaveSchedule(e)}>
                <div className=" modal-timeType">
                  <div className="col-10">

                    <label>
                      <FormattedMessage id="manage-schedule.choose-date" />
                    </label>
                    <div className="datePicker"  style={{marginTop:'0px'}}>
                      <DatePicker
                        value={
                          startDate === ""
                            ? language === LANGUAGES.VI
                              ? "-- Từ ngày --"
                              : "-- Start date --"
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
                              : "-- End date --"
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
                        required
                        min="1"
                        type="number"
                        placeholder={
                          language === LANGUAGES.VI
                              ? "Số người tối đa"
                              : "Maximum person"
                        }
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
                      type='submit'
                    >
                      <FormattedMessage id="manage-schedule.save-info" />
                    </button>
                  </div>
                </div>
                </form>
              </ModalBody>
            </Modal>
          </div>
          <table className="table table-bordered mt-3">
            <thead className='table-dark'>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col"><FormattedMessage id="manage.day" /></th>
                    <th scope="col"><FormattedMessage id="manage.time" /></th>
                    <th scope="col"><FormattedMessage id="manage.max-person" /></th>
                    {/* <th scope="col">Trạng thái</th> */}
                    <th scope="col"><FormattedMessage id="menu.admin.manage-user.actions" /></th>
                </tr>
            </thead>
            <tbody>
                {arrData && arrData.length > 0 ? 
                    arrData.map((item, index)=>{
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{moment(item.date).format('DD-MM-YYYY')}</td>
                                <td>{language === LANGUAGES.VI? 
                                    item.timeTypeData.valueVi: item.timeTypeData.valueEn
                                    }</td>
                                <td>{item.maxNumber}</td>
                                <td>
                                    <button className='btn btn-info mr-2' onClick={()=>this.handleEdit(item)}
                                    ><FormattedMessage id="menu.admin.manage-user.edit" /></button>
                                    <button className='btn btn-danger'
                                    onClick={()=>this.handleModalDelete(item.id)}
                                    ><FormattedMessage id="menu.admin.manage-user.delete" /></button>
                                </td>
                            </tr>
                        )
                    })
                    :
                    <tr>
                        <td colSpan='6' style={{textAlign: 'center'}}><FormattedMessage id="manage.no-data"/></td>
                    </tr>
                }
            </tbody>
        </table>
        </div>
        {isModalDelete &&
            <Delete 
            isOpen={isModalDelete}
            closeOpen={()=>this.setState({isModalDelete: false})}
            handelDelete={()=>this.handleDelete()}
            />
        }
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
