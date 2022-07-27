import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers} from '../../services/userService';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers:[]
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


    render() {
        let arrUsers =this.state.arrUsers;
        return (
            <div className="container users-container">
                <div className="root">
                    <div className="title text-center" >Manage users</div>
                    <table className="table table-bordered mt-5">
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
