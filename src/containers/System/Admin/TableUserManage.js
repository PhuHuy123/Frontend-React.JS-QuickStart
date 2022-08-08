import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableUserManage.scss';
import * as actions from '../../../store/actions';

class TableUserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux()
    }
    handlerDeleteUser=(id)=>{
        this.props.deleteUserRedux(id);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    // gender
    if(prevProps.arrUsers!==this.props.arrUsers){
        this.setState({
            usersRedux:this.props.arrUsers,
        })
        }
    }
    render() {
        let {usersRedux}=this.state;
        return (
            <div className="container users-container">
                <div className="root">
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
                                 usersRedux && usersRedux.length>0 &&
                                 usersRedux.map((item,index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button>Edit</button>
                                                <button onClick={()=>this.handlerDeleteUser(item.id)}>Delete</button>
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
        arrUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserManage);
