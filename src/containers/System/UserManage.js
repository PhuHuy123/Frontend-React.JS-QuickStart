import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUserAPI, deleteUserAPI, editUserAPI} from '../../services/userService';
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser'
import {emitter} from '../../utils/emitter';
import {LANGUAGES, USER_ROLE} from '../../utils';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers:[],
            isOpenModal:false,
            isOpenModalEdit:false,
            userEdit:{},
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
    toggleUserModalEdit = ()=>{
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit
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

    handleEditUser =async(user)=>{
        this.setState({
            isOpenModalEdit:true,
            userEdit: user
        })
    }

    doEditUser = async(user)=>{
        try {
            let response = await editUserAPI(user);
            if(response && response.errCode!==0){
                alert(response.message);
            }
            else{
                await this.getAllUsersFromReact()
                this.setState({isOpenModalEdit:false});
            }
        } catch (e) {
            console.log(e)
        }

    }
    render() {
        let {language, userInfo} = this.props;
        let arrUsers =this.state.arrUsers;
        return (
            <>
                { userInfo.roleId === USER_ROLE.ADMIN &&
                <div className="container users-container">
                    <ModalUser
                        toggleUserModal= {this.toggleUserModal}
                        createNewUser = {this.createNewUser}
                        isOpen= {this.state.isOpenModal}
                    />
                    {
                        this.state.isOpenModalEdit &&
                        <ModalEditUser
                        toggleUserModalEdit= {this.toggleUserModalEdit}
                        isOpen= {this.state.isOpenModalEdit}
                        user= {this.state.userEdit}
                        editUser = {this.doEditUser}
                        />
                    }
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
                                                    <button onClick={()=>this.handleEditUser(item)}>Edit</button>
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
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
