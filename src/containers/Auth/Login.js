import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { handleLogin, postReCapTCha } from "../../services/userService";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { TextField } from '@mui/material';
import LoadingOverlay from "react-loading-overlay";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      errMessage: "",
      isReCaptCha: false,
      captchaRef: null,
      isShowLoading: false,
    };
    this.myRef = React.createRef();
  }
  handlerOnChangeUserName = (input) => {
    this.setState({
      username: input,
    });
  };
  handlerOnChangePassword = (input) => {
    this.setState({
      password: input,
    });
  };
  handlerLogin = async (e) => {
    e.preventDefault();
    this.setState({ isShowLoading: true });
    let res = await postReCapTCha({
      token:this.myRef.current.getValue()
    });
    this.myRef.current.reset();
    if (res && res.errCode===0 && res.data.success) {
      try {
        let data = await handleLogin(this.state.username, this.state.password);
        if (data && data.errCode !== 0) {
          this.setState({
            errMessage: data.message,
          });
          this.setState({ isShowLoading: false });
          toast.error(data.message);
        }
        if (data && data.errCode === 0) {
          this.setState({ isShowLoading: false });
          toast.success("Logged in successfully !");
          this.props.userLoginSuccess(data.user);
        }
      } catch (error) {
        this.setState({ isShowLoading: false });
        if (error.response) {
          if (error.response.data) {
            this.setState({
              errMessage: error.response.data.message,
            });
          }
        }
      }
    } else {
      this.setState({ isShowLoading: false });
      toast.error("Error: you are not done ReCaptCha !");
    }
  };
  handlerShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handlerLogin();
    }
  };
  render() {
    return (
      <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
      <div className="login-background">
        <Link to={`/home`}>
          <div className="header-logo"></div>
        </Link>
        <form onSubmit={(e) => this.handlerLogin(e)}>
          <div className="login-container">
            <div className="login-connect row">
              <div className="col-12 login-text">Login</div>
              <div className="col-12 form-group login-input">
                <TextField
                  required
                  className="form-control"
                  type="text"
                  label="Username"
                  value={this.state.username}
                  onChange={(e) => this.handlerOnChangeUserName(e.target.value)}
                  onKeyDown={(e) => this.handleKeyDown(e)}
                />
              </div>
              <div className="col-12 form-group login-input">
                <div className="custom-input-password">
                  <TextField
                  ref={this.myRef}
                    required
                    className="form-control"
                    type={this.state.showPassword ? "text" : "password"}
                    label="Password"
                    value={this.state.password}
                    onChange={(e) => this.handlerOnChangePassword(e.target.value)}
                    onKeyDown={(e) => this.handleKeyDown(e)}
                  />
                  <i
                    className={
                      this.state.showPassword
                        ? "fas fa-eye"
                        : "fas fa-eye-slash"
                    }
                    onClick={() => this.handlerShowPassword()}
                  ></i>
                </div>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <div className="col-12 reCaptCha">
                <ReCAPTCHA
                  ref={this.myRef}
                  sitekey={process.env.REACT_APP_SITE_KEY}
                />
              </div>
              <div className="col-12 forgot-password">
                <span>
                  <Link to={`/account/password/reset`}>
                    Forgot your password?
                  </Link>
                </span>
              </div>
              <div className="col-12 form-group btn-login">
                <button type="submit">Login</button>
              </div>
              <div className="col-12 text-center mb-5">
                <span>Do not have an account: </span>
                <Link to={`/signup`}>Sign up</Link>
              </div>
              {/* <div className="col-12 social-login ">
                <i className="fab fa-google-plus google"></i>
                <i className="fab fa-facebook facebook"></i>
              </div> */}
            </div>
          </div>
        </form>
      </div>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
