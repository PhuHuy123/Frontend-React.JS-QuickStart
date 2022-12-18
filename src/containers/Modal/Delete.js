import {Modal,Button, ModalBody, ModalFooter} from 'reactstrap';
function Delete(props) {
    return ( 
        <Modal
            isOpen={props.isOpen}
            centered
          >
            <div className="modal-header">
                <h5 className="modal-title"><b style={{color:'red'}}>Thông báo</b></h5>
                <button type="button" className="close" aria-label="Close" onClick={props.closeOpen}>
                    <span aria-hidden='true'>×</span>
                </button>
                </div>
                <ModalBody>
                  Bạn có muốn xóa không
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-danger" onClick={props.handelDelete}>Delete</Button>
                    <Button color="secondary" onClick={props.closeOpen}>Cancel</Button>
            </ModalFooter>
          </Modal>
     );
}

export default Delete;