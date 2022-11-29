import {Modal,Button, ModalBody, ModalFooter} from 'reactstrap';
import { LANGUAGES } from "../../../utils";
import { useState} from 'react';
import { connect } from "react-redux";
import moment from "moment";

const Modals =(props, state) =>{
    const [dataDoctor, setDataDoctor] = useState(props.dataDoctor)
    return ( 
        <Modal
            isOpen={props.isOpen}
            className={"booking-modal-container"}
            centered
          >
            <div className="modal-header">
                <h5 className="modal-title"><b style={{color:'red'}}>Chi tiết phiên khám</b></h5>
                <button type="button" className="close" aria-label="Close" onClick={props.closeBooking}>
                    <span aria-hidden='true'>×</span>
                </button>
            </div>
            <ModalBody style={{padding:"10px 40px"}}>
            <p><strong>Mã số:</strong> {props.dataSee.id}</p>
            <p><strong>Khám:</strong> {props.dataSee.name}</p>
            <p><strong>Bác sĩ khám:</strong> {props.language === LANGUAGES.VI ? 
                            `${dataDoctor.lastName} ${dataDoctor.firstName}`
                            :`${dataDoctor.firstName} ${dataDoctor.lastName}`}</p>
            <p><strong>Ngày khám:</strong> {props.language === LANGUAGES.VI
                            ? moment(props.dataSee.date).format("DD-MM-YYYY")
                            : moment(props.dataSee.date).format("MM-DD-YYYY")}
                        </p>
            <p><strong>Giờ khám:</strong> {props.language === LANGUAGES.VI ? 
                `${props.dataSee.timeTypeDataExamination.valueVi}`
                :`${props.dataSee.timeTypeDataExamination.valueEn}`}</p>
            <p><strong>Giá khám:</strong> {props.dataSee.price} VNĐ</p>
            <p><strong>Bác sĩ đánh giá:</strong> {props.dataSee.comment}</p>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.closeBooking}>Cancel</Button>
            </ModalFooter>
          </Modal>
     );
}
const mapStateToProps = (state) => {
    return {
      language: state.app.language,
      userInfo: state.user.userInfo,
    };
  };
export default connect(mapStateToProps)(Modals);