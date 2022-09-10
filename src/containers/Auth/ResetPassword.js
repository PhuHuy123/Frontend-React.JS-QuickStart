import React, { Component } from 'react';
import { connect } from "react-redux";
import './ResetPassword.scss';
import {handleCheckEmail} from '../../services/userService';
import {LANGUAGES} from '../../utils';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errCode: 1,
            isShowLoading: false
        }
    }

    async componentDidMount() {
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
        }
        // if(this.state.errCode !== prevProps.errCode){

        // }
    }
    handlerOnChangeInput = (input, id)=>{
        let copyState = {...this.state};
        copyState[id]= input.target.value; 
        this.setState({
            ...copyState
        })
    }
    handlerSubmit = async() =>{
        this.setState({isShowLoading: true});
        let data = await handleCheckEmail({
            email:this.state.email
        });
        if(data && data.userData && data.userData.errCode===0){
            this.setState({isShowLoading: false});
            this.setState({
                errCode: 0,
            })
            toast.info("Vui lòng check gmail vừa nhập!")

        }
        else{
            this.setState({isShowLoading: false});
            toast.error("Email không tồn tại")
        }
    }
    handleKeyDown = (event)=>{
        if (event.key === 'Enter' || event.keyCode === 13){
            this.handlerSubmit()
        }
    }
    render() {
        let {language} = this.props;
        let {email, errCode} = this.state;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className="reset-container">
                        <div className="logo"><h2><b>Logo</b></h2></div>
                        <div className="reset-content">
                                <div className="panel">
                                    <h2 className="h3">Reset Password</h2>
                            { errCode && errCode !== 0 ?
                                <div className="panel-body">
                                    <p className="overview">Enter your email address below and we'll send you a link to reset your password.</p>
                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input className='form-control' type="text" placeholder="Email address" 
                                                value={this.state.username}
                                                onChange={(e)=>this.handlerOnChangeInput(e,'email')}
                                                onKeyDown={(e)=>this.handleKeyDown(e)}
                                        />
                                        <button className="btn btn-primary btn-lg btn-block" type="submit"
                                                onClick={()=>this.handlerSubmit()}
                                        >Reset Password</button>
                                    </div>
                                </div>
                                    :
                                        <div className="alert-warning">
                                            Check your inbox for the next steps.
                                            If you don't receive an email, and it's not in your spam folder
                                            this could mean you signed up with a different address.
                                        </div>
                                    }
                                <div className="panel-footer">
                                    <Link to={`/login`}>Log In</Link>
                                            &nbsp;or&nbsp;
                                    <Link to={`/signup`}>Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </LoadingOverlay>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);