import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";
import { getAllExaminationById } from "../../../services/userService";
import Modals from "../../Patient/History/Modal";
class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
      comment: "",
      name: "",
      isHistory: false,
      history: [],
      isDetail: false,
      dataDetail: "",
    };
  }

  async componentDidMount() {}

  getHistory = async (id) => {
    let res = await getAllExaminationById(id);
    if (res && res.errCode === 0) {
      this.setState({
        history: res.data,
      });
      this.setState({ isHistory: true });
    }
  };
  handleSeeDetails = (data) => {
    this.setState({
      isDetail: true,
      dataDetail: data,
    });
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.dataModal !== prevProps.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handlerOnChangePrice = (e) => {
    this.setState({
      price: e.target.value,
    });
  };
  handlerOnChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handlerOnChangeComment = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };
  handlerSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };
  render() {
    let { language } = this.props;
    let { isOpenModal, closeRemedyModal, dataModal } = this.props;
    let { isHistory, history, dataDetail, isDetail } = this.state;
    console.log(isDetail);
    return (
      <>
        {!isHistory ? (
          <Modal
            isOpen={isOpenModal}
            className={"booking-modal-container"}
            size="xm"
            centered
            // backdrop={true}
          >
            <div className="modal-header">
              <h5 className="modal-title">Thông tin</h5>
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
              <div className="row">
                <div className="col-9 px-5 form-group">
                  <h4>Chi tiết bệnh nhân</h4>
                  <p>
                    <strong>Tên bệnh nhân: </strong>
                    {language === LANGUAGES.VI
                      ? `${dataModal.dataBooking.lastName} ${dataModal.dataBooking.firstName}`
                      : `${dataModal.dataBooking.firstName} ${dataModal.dataBooking.lastName}`}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    {dataModal.dataBooking.email}
                  </p>
                  <p>
                    <strong>Số điện thoại: </strong>
                    {dataModal.dataBooking.phoneNumber}
                  </p>
                </div>
                <div>
                  <p
                    className="history-bn"
                    onClick={() =>
                      this.getHistory(dataModal.dataBooking.patientId)
                    }
                  >
                    Lịch sử khám
                  </p>
                </div>
                <hr
                  className="mx-4"
                  style={{ border: "1px solid black", width: "100%" }}
                />
                <div className="col-12 px-5 form-group">
                  <h4>Chi tiết cuộc hẹn</h4>
                  <p>
                    <strong>Cuộc hẹn số: </strong>
                    {dataModal.id}
                  </p>
                  <p>
                    <strong>Tên bác sĩ: </strong>
                    {language === LANGUAGES.VI
                      ? `${dataModal.dataDoctor.lastName} ${dataModal.dataDoctor.firstName}`
                      : `${dataModal.dataDoctor.firstName} ${dataModal.dataDoctor.lastName}`}
                  </p>
                  <p>
                    <strong>Lý do khám: </strong>
                    {dataModal.reason}
                  </p>
                  <p>
                    <strong>Ngày hẹn: </strong>
                    {language === LANGUAGES.VI
                      ? moment(dataModal.date).format("DD-MM-YYYY")
                      : moment(dataModal.date).format("MM-DD-YYYY")}
                  </p>
                  <p>
                    <strong>Thời gian: </strong>
                    {language === LANGUAGES.VI
                      ? dataModal.timeTypeDataExamination.valueVi
                      : dataModal.timeTypeDataExamination.valueEn}
                  </p>
                  <p>
                    <strong>Chuẩn đoán: </strong>
                    <input
                      disabled={dataModal.statusId !== "S2" ? true : false}
                      value={dataModal.name}
                      onChange={(e) => this.handlerOnChangeName(e)}
                      type="text"
                    ></input>
                  </p>
                  <p>
                    <strong>Giá khám: </strong>
                    <input
                      disabled={dataModal.statusId !== "S2" ? true : false}
                      value={
                        dataModal.statusId !== "S2"
                          ? (+dataModal.price).toLocaleString()
                          : dataModal.price
                      }
                      onChange={(e) => this.handlerOnChangePrice(e)}
                      type="text"
                      style={{ width: "100px" }}
                    ></input>{" "}
                    Vnđ
                  </p>
                  <p style={{ display: "flex" }}>
                    <strong>Nhận xét của bác sĩ: </strong>
                    <textarea
                      disabled={dataModal.statusId !== "S2" ? true : false}
                      value={dataModal.comment}
                      onChange={(e) => this.handlerOnChangeComment(e)}
                      type="text"
                      style={{ width: "65%", minHeight: "100px" }}
                    ></textarea>
                  </p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.handlerSendRemedy()}>
                Send
              </Button>{" "}
              <Button color="secondary" onClick={closeRemedyModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        ) : !isDetail ? (
          <Modal isOpen={isHistory} size="lg">
            <div className="modal-header">
              <h5 className="modal-title">Lịch sử khám bệnh</h5>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => this.setState({ isHistory: false })}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <ModalBody>
              <div className="content-right col-12">
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
                            className="see-details-history"
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
            </ModalBody>
          </Modal>
        ) : (
          <Modals
            isOpen={isDetail}
            dataSee={dataDetail}
            dataDoctor={dataDetail.dataDoctor}
            closeBooking={()=>this.setState({ isDetail: false })}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
