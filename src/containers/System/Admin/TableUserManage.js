import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableUserManage.scss';
import * as actions from '../../../store/actions';
class TableUserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
            arrShow: [],
            numberAll: 0,
            numberShowUser: 7,
            selected:1,
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
                arrShow: this.props.arrUsers.slice(0,this.state.numberShowUser),
                numberAll: this.props.arrUsers.length,
            })
        }
        if(prevProps.classify!==this.props.classify){
            let arr=[];
            this.props.arrUsers.map((item)=>{
                if(item.roleId === this.props.classify || this.props.classify === 'ALL'){
                    arr.push(item)
                }
            })
            this.setState({
                usersRedux:arr,
                arrShow: arr.slice(0,this.state.numberShowUser),
                numberAll: arr.length,
            })
        }
    }
    handlerEditUser =(user)=>{
        this.props.handlerEditUserFromParent(user)
    }
    createButtonPage = (number) =>{
        let arr=[];
        let btn = Math.ceil(number / this.state.numberShowUser);
        for(let i=1; i<=btn; i++){
            arr.push(i);
        }
        return arr.map((item)=>{
            return(
                <button key ={item} 
                    className={this.state.selected === item ? 'selected' : ''}
                    onClick={()=>this.handlerNextPage(item)}
                >{item}</button>
            )
                
        })
    }
    handlerNextPage = (number) =>{
        let {numberShowUser, usersRedux} = this.state;
        let end = numberShowUser*number
        this.setState({
            arrShow: usersRedux.slice(end-numberShowUser, end),
            selected: number
        })
    }
    render() {
        let {usersRedux,arrShow, numberAll, numberShowUser}=this.state;
        console.log("1",this.props.classify)
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
                                arrShow && arrShow.length>0 &&
                                arrShow.map((item,index)=>{
                                    if(item.roleId === this.props.classify || this.props.classify === 'ALL')
                                    {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn btn-warning" onClick={()=>this.handlerEditUser(item)}>Edit</button>
                                                <button className="btn btn-danger ml-3" onClick={()=>this.handlerDeleteUser(item.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )}
                                })
                            }
                        </tbody>

                    </table>
                    <div className="paging">

                    {this.createButtonPage(numberAll)}
                    </div>
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
