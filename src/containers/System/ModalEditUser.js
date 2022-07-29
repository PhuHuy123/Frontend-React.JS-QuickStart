import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:'',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
        }
    }

    componentDidMount() {
        let userData =this.props.user;
        if(userData && !_.isEmpty(userData)){
            // luu y k co dau = sau this.state
            this.setState ({
                id: userData.id,
                email: userData.email,
                firstName: userData.firstName,  
                lastName: userData.lastName,
                address: userData.address,
                phoneNumber: userData.phoneNumber,
            })
        }
    }

    toggle=()=>{
        this.props.toggleUserModalEdit();
    }

    handlerOnChangeInput=(input, id)=>{
        let copyState = {...this.state};
        copyState[id]= input; 
        this.setState({
            ...copyState
        })
    }

    checkValidInput=()=>{
        let isValid = true;
        let arrInput = ['email', 'firstName', 'lastName', 'address', 'phoneNumber']
        for(let i=0; i<arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert("Bạn chưa nhập:" + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handlerUpdateUser=()=>{  
        if(this.checkValidInput()===true){
            // = true thi goi API
            this.props.editUser(this.state);
        }
    }
    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={()=>{this.toggle()}}
                className={'modal-user-container'}
                size="lg"
            >
                <ModalHeader toggle={()=>{this.toggle()}}>Edit User</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className='root'>
                            <form className="col-md-8" action="/post-crud" method="post">
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label >Email</label>
                                        <input type="email" className="form-control" name="email" placeholder="Email"
                                            value={this.state.email}
                                            onChange={(e)=>this.handlerOnChangeInput(e.target.value, 'email')}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>First name</label>
                                        <input type="text" className="form-control" name="firstName" placeholder="First name"
                                            value={this.state.firstName}
                                            onChange={(e)=>this.handlerOnChangeInput(e.target.value, 'firstName')}
                                        />
                                    </div>
                                    <div className="form-group col-md-8">
                                        <label>Last name</label>
                                        <input type="text" className="form-control" name="lastName" placeholder="Last name"
                                            value={this.state.lastName}
                                            onChange={(e)=>this.handlerOnChangeInput(e.target.value, 'lastName')}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" className="form-control" name="address" placeholder="Address"
                                        value={this.state.address}
                                        onChange={(e)=>this.handlerOnChangeInput(e.target.value, 'address')}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label >Phone number</label>
                                        <input type="text" className="form-control" name="phoneNumber"
                                            value={this.state.phoneNumber}
                                            onChange={(e)=>this.handlerOnChangeInput(e.target.value, 'phoneNumber')}
                                        />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label>Gender</label>
                                        <select name="gender" className="form-control">
                                            <option value="1">Male</option>
                                            <option value="0">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label>RoleId</label>
                                        <select name="roleId" className="form-control">
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
                    <Button color="primary" className='px-3' onClick={()=>{this.handlerUpdateUser()}}>Update</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);


