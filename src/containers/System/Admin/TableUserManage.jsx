import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableUserManage.scss';
import * as actions from '../../../store/actions';
import {LANGUAGES} from '../../../utils';
import Delete from "../../Modal/Delete"
class TableUserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
            arrShow: [],
            numberAll: 0,
            numberShowUser: 7,
            selected:1,
            id: '',
            isModalDelete: false,
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux()
    }
    handleModalDelete = (id) =>{
        this.setState({
            id,
            isModalDelete: true,
        })
    }
    handlerDeleteUser=()=>{
        this.props.deleteUserRedux(this.state.id);
        this.setState({
            id: '',
            isModalDelete: false,
        })
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
        let {usersRedux,arrShow, numberAll, numberShowUser, isModalDelete}=this.state;
        let {language} = this.props;
        return (
            <div className="container users-container">
                <div className="root">
                    <table className="table table-bordered mt-3">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col"><FormattedMessage id="menu.admin.manage-user.name"/></th>
                                <th scope="col"><FormattedMessage id="menu.admin.manage-user.address"/></th>
                                <th scope="col"><FormattedMessage id="menu.admin.manage-user.actions"/></th>
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
                                            <td>{index+1}</td>
                                            <td>{item.email}</td>
                                            <td>{language===LANGUAGES.VI?`${item.lastName} ${item.firstName}`:`${item.firstName} ${item.lastName}`}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn btn-warning" onClick={()=>this.handlerEditUser(item)}><FormattedMessage id="menu.admin.manage-user.edit"/></button>
                                                <button className="btn btn-danger ml-3" onClick={()=>this.handleModalDelete(item.id)}><FormattedMessage id="menu.admin.manage-user.delete"/></button>
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
                {isModalDelete &&
                    <Delete 
                    isOpen={isModalDelete}
                    closeOpen={()=>this.setState({isModalDelete: false})}
                    handelDelete={()=>this.handlerDeleteUser()}
                    />
                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        arrUsers: state.admin.users,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserManage);
