import React, { Component } from 'react';
import { connect } from "react-redux";
import './RemedyModal.scss';
import {LANGUAGES, CommonUtils} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import {Modal,Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { toast } from 'react-toastify';
import moment from 'moment';
class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            imgBase64: '',
        }
    }

    async componentDidMount() {
        if(this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
            
        }
        if(this.props.dataModal !== prevProps.dataModal){
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    handlerOnChangeEmail =(e)=>{
        this.setState({
            email: e.target.value
        })
    }
    handlerOnChangeImage = async(e)=>{
        let data = e.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            // let objectURL = URL.createObjectURL(file);
            this.setState({
                // previewImgURL:objectURL,
                imgBase64: base64
            })
        }
    }
    handlerSendRemedy = () => {
        this.props.sendRemedy(this.state);
    }
    render() {
        let {language} = this.props;
        let {isOpenModal, closeRemedyModal, dataModal, sendRemedy} = this.props;

        return (
            <Modal 
                isOpen= {isOpenModal}
                className={'booking-modal-container'}
                size = "lg"
                centered
                // backdrop={true}
            >
                <div className="modal-header">
                    <h5 className="modal-title">Modal title</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal}>
                        <span aria-hidden='true'>×</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>Email bệnh nhân</label>
                            <input className="form-control" type="email" value={this.state.email}
                                onChange={(e)=>this.handlerOnChangeEmail(e)}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Chọn file hóa đơn</label>
                            <input className="form-control-file" type="file"
                                onChange={(e)=>this.handlerOnChangeImage(e)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>this.handlerSendRemedy()}>Send</Button>{' '}
                    <Button color="secondary" onClick={closeRemedyModal}>Cancel</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
