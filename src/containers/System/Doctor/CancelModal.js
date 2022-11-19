import React, { Component } from 'react';
import { connect } from "react-redux";
import './CancelModal.scss';
import {LANGUAGES, CommonUtils} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import {Modal,Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { postCancelAppointment} from'../../../services/userService'

import { toast } from 'react-toastify';
import moment from 'moment';
class CancelModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
            
        }
    }
    handlerConfirmRemedy = async() => {
        let {dataModal} = this.props;
        let res = await postCancelAppointment({
            doctorId: dataModal.doctorId,
            bookingId: dataModal.bookingId,
            timeType: dataModal.timeType,
        })
        if(res && res.errCode ===0){
            this.props.sendRemedy();
            this.props.closeCancelModal();
            toast.success('Confirm Remedy successfully')
        }else{
            this.props.sendRemedy();
            this.props.closeCancelModal();
            toast.error('Error confirm remedy...')
        }
    }
    render() {
        let {language} = this.props;
        let {isOpenModal, closeCancelModal, dataModal} = this.props;
        return (
            <Modal 
            isOpen= {isOpenModal}
            className={'booking-modal-container'}
            centered
            // backdrop={true}
            >
                <div className="modal-header">
                    <h5 className="modal-title"><b style={{color:'red'}}>Hủy lịch hẹn</b></h5>
                    <button type="button" className="close" aria-label="Close" onClick={closeCancelModal}>
                        <span aria-hidden='true'>×</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 pl-3 form-group">
                            <h4>Chi tiết cuộc hẹn</h4>
                            <p><strong>Cuộc hẹn số: </strong>{dataModal.id}</p>
                            <p><strong>Tên bác sĩ: </strong>
                            {language === LANGUAGES.VI?`${dataModal.dataDoctor.lastName} ${dataModal.dataDoctor.firstName}`
                            : `${dataModal.dataDoctor.firstName} ${dataModal.dataDoctor.lastName}`}
                            </p>
                            <p><strong>Ngày hẹn: </strong>
                            {language === LANGUAGES.VI? 
                                moment(dataModal.date).format('DD-MM-YYYY'): moment(dataModal.date).format('MM-DD-YYYY')
                            }</p>
                            <p><strong>Thời gian: </strong>
                            {language === LANGUAGES.VI? 
                                dataModal.timeTypeDataExamination.valueVi: dataModal.timeTypeDataExamination.valueEn
                            }</p>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={()=>this.handlerConfirmRemedy()}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={closeCancelModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
                
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CancelModal);
