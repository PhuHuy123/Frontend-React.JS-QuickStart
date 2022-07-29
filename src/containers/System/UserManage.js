import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUserAPI, deleteUserAPI} from '../../services/userService';
import ModalUser from './ModalUser'
import {emitter} from '../../utils/emitter';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers:[],
            isOpenModal:false
        }
    }

    async componentDidMount() {
        this.getAllUsersFromReact();
    }
    getAllUsersFromReact = async ()=>{
        let response = await getAllUsers('ALL');
        if((response && response.errCode === 0)){
            this.setState({
                arrUsers: response.users
            })
        }
    }
    handleAddNewUser = ()=>{
        this.setState({
            isOpenModal:true
        })
    }
    toggleUserModal = ()=>{
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    createNewUser = async(data)=>{
        try {
            let response = await createNewUserAPI(data);
            if(response && response.errCode!==0){
                alert(response.message);
            }
            else{
                await this.getAllUsersFromReact()
                this.setState({isOpenModal:false});
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser =async(data)=>{
        try {
            let response = await deleteUserAPI(data.id);
            if(response && response.errCode!==0){
                alert(response.message);
            }
            else{
                await this.getAllUsersFromReact()
            }
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        let arrUsers =this.state.arrUsers;
        return (
            <div className="container users-container">
                <ModalUser
                    toggleUserModal= {this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                    isOpen= {this.state.isOpenModal}
                />
                <div className="root">
                    <div className="title text-center" >Manage users</div>
                    <div className="mx-2">
                        <button
                            onClick={()=>this.handleAddNewUser()}
                            className="btn btn-primary px-2">Add new user</button>
                    </div>
                    <table className="table table-bordered mt-3">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">First name</th>
                                <th scope="col">Last name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrUsers && arrUsers.map((item,index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button>Edit</button>
                                                <button onClick={()=>this.handleDeleteUser(item)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            
                        </tbody>

                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
