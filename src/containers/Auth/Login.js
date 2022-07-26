import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:'',
            showPassword: false,
        }
    }
    handlerOnChangeUserName =(input)=>{
        this.setState({
            username: input
        })
    }
    handlerOnChangePassword=(input)=>{
        this.setState({
            password: input
        })
    }
    handlerLogin =(input)=>{
        alert()
    }
    handlerShowPassword=()=>{
            this.setState({
                showPassword: !this.state.showPassword
            })
    }
    render() {

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-connect row">
                        <div className="col-12 login-text">Login</div>
                        <div className="col-12 form-group login-input">
                            <label ><b>Username</b></label>
                            <input className='form-control' type="text" placeholder="Enter Username" 
                            value={this.state.username}
                            onChange={(e)=>this.handlerOnChangeUserName(e.target.value)}
                            />

                        </div>
                        <div className="col-12 form-group login-input">                        
                            <label ><b>Password</b></label>
                            <div className="custom-input-password">
                                <input className='form-control' type={this.state.showPassword?"text":"password"} placeholder="Enter Password" 
                                    value={this.state.password}
                                    onChange={(e)=>this.handlerOnChangePassword(e.target.value)}
                                />
                            
                                <i className= {this.state.showPassword?"fas fa-eye":"fas fa-eye-slash"}
                                    onClick={()=>this.handlerShowPassword()}
                                ></i>
                            </div>

                        </div>
                        <div className="col-12 form-group btn-login">
                            <button type="submit" onClick={()=>this.handlerLogin()}>Login</button>
                        </div>
                        <div className="col-12">
                            <span>Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center">
                            <span>Or sign in with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus google"></i>
                            <i className="fab fa-facebook facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
