import React, { Component } from 'react';
import { connect } from "react-redux";
import './NewPassword.scss';
import {getUpdatePassword} from '../../services/userService';
import {LANGUAGES} from '../../utils';
import { FormattedMessage } from 'react-intl';
import { after } from 'lodash';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
class NewPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errCode: 0,
            password: '',
            confirmPassword: '',
        }
    }

    async componentDidMount() {
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
        }
    }
    handlerOnChangeInput = (input, id)=>{
        let copyState = {...this.state};
        copyState[id]= input.target.value; 
        this.setState({
            ...copyState
        })
    }
    handlerSaveUser = async() =>{
        if(this.state.password !== this.state.confirmPassword){
            toast.error("Password không giống nhau !!")
            return;
        } 
        if(this.props.location && this.props.location.search){
            let url = new URLSearchParams(this.props.location.search);
            let token = url.get('token');
            let id = url.get('id');
            let res = await getUpdatePassword({
                token: token,
                id: id,
                password:this.state.password
            })
            
            if(res && res.errCode === 0){
                toast.success("Success reset password!")

                if(this.props.history){
                    this.props.history.push(`/login`)
                }
            }
            else {
                toast.error("Error reset password!")
            }
           }
    }
    render() {
        let {language} = this.props;
        let { errCode, password, confirmPassword} = this.state;
        return (
            <>
                <div className="reset-container">
                        <div className="logo"><h2><b>Logo</b></h2></div>
                        <div className="reset-content">
                                <div className="panel">
                                    <h2 className="h3">Enter your new password</h2>
                                <div className="panel-body">
                                    <div className="form-group">
                                    <label>New password</label>
                                    <input type="password" className="form-control" name="password" placeholder="New password"
                                        value={password}
                                        onChange={(e)=>this.handlerOnChangeInput(e, 'password')}
                                    />
                                    <label>Confirm password</label>
                                    <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e)=>this.handlerOnChangeInput(e, 'confirmPassword')}
                                    />
                                    <button className="btn btn-primary btn-lg btn-block" type="submit"
                                            onClick={()=>{this.handlerSaveUser()}}
                                    >Update Password</button>
                                    </div>
                                </div>
                                <div className="panel-footer">
                                    <Link to={`/login`}>Log In</Link>
                                            &nbsp;or&nbsp;
                                    <Link to={`/signup`}>Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
            </>
                
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
