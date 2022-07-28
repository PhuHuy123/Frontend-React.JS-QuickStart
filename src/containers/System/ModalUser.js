import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ModalUser extends Component {

     constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    toggle=()=>{
        this.props.toggleUserModal()
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={()=>{this.toggle()}} 
                className={'modal-user-container'}
                size="lg"
            >
                <ModalHeader toggle={()=>{this.toggle()}}>Add New User</ModalHeader>
                <ModalBody>
                    <div class="container">
                        <div className='root'>
                            <form class="col-md-8" action="/post-crud" method="post">
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail4">Email</label>
                                        <input type="email" class="form-control" name="email" placeholder="Email"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputPassword4">Password</label>
                                        <input type="password" class="form-control" name="password" placeholder="Password"/>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail4">First name</label>
                                        <input type="text" class="form-control" name="firstName" placeholder="First name"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputPassword4">Last name</label>
                                        <input type="text" class="form-control" name="lastName" placeholder="Last name"/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputAddress">Address</label>
                                    <input type="text" class="form-control" name="address" placeholder="Address"/>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputAddress">Phone number</label>
                                        <input type="text" class="form-control" name="phoneNumber"/>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="inputState">Gender</label>
                                        <select name="gender" class="form-control">
                                            <option value="1">Male</option>
                                            <option value="0">Female</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="inputState">RoleId</label>
                                        <select name="roleId" class="form-control">
                                            <option value="1">Admin</option>
                                            <option value="2">Doctor</option>
                                            <option value="3">Patient</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={()=>{this.toggle()}}>Save changes</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={()=>{this.toggle()}}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


