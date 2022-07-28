import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers} from '../../services/userService';
import ModalUser from './ModalUser'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers:[],
            isOpenModal:false
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if((response && response.errCode === 0)){
            this.setState({
                arrUsers: response.users
            })
        }
        console.log(response)

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
    render() {
        let arrUsers =this.state.arrUsers;
        return (
            <div className="container users-container">
                <div className="root">
                <ModalUser
                    toggleUserModal= {this.toggleUserModal}
                    isOpen= {this.state.isOpenModal}
                />
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
                                            <t>{item.firstName}</t>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button>Edit</button>
                                                <button>Delete</button>
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
