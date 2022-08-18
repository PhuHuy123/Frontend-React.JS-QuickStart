import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import {handleLogin} from'../../services/userService'
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
            errMessage:'',
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
    handlerLogin =async()=>{
        this.setState({
            errMessage:'',
        })
        try {
            let data = await handleLogin(this.state.username, this.state.password);
            if(data && data.errCode!==0){
                this.setState({
                    errMessage: data.message,
                })
            }
            if(data && data.errCode===0){
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errMessage: error.response.data.message,
                    })
                }
            }
        }
    }
    handlerShowPassword = ()=>{
        this.setState({
            showPassword: !this.state.showPassword
        })
    }
    handleKeyDown = (event)=>{
        if (event.key === 'Enter' || event.keyCode === 13){
            this.handlerLogin()
        }
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
                            onKeyDown={(e)=>this.handleKeyDown(e)}
                            />

                        </div>
                        <div className="col-12 form-group login-input">                        
                            <label ><b>Password</b></label>
                            <div className="custom-input-password">
                                <input className='form-control' type={this.state.showPassword?"text":"password"} placeholder="Enter Password" 
                                    value={this.state.password}
                                    onChange={(e)=>this.handlerOnChangePassword(e.target.value)}
                                    onKeyDown={(e)=>this.handleKeyDown(e)}
                                />
                            
                                <i className= {this.state.showPassword?"fas fa-eye":"fas fa-eye-slash"}
                                    onClick={()=>this.handlerShowPassword()}
                                ></i>
                            </div>

                        </div>
                        <div className="col-12" style={{color: 'red'}}>
                            {this.state.errMessage}
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
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
