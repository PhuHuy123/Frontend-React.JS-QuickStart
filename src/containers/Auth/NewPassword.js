import React, { Component } from "react";
import { connect } from "react-redux";
import "./NewPassword.scss";
import { getUpdatePassword, postReCapTCha } from "../../services/userService";
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from "react-intl";
import { after } from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
class NewPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errCode: 0,
      password: "",
      confirmPassword: "",
      isReCaptCha: false,
      captchaRef: null,
    };
  }

  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handlerOnChangeInput = (input, id) => {
    let copyState = { ...this.state };
    copyState[id] = input.target.value;
    this.setState({
      ...copyState,
    });
  };
  handlerSaveUser = async (e) => {
    e?.preventDefault();
    if (this.state.isReCaptCha === false) {
      toast.error("Error: you are not done ReCaptCha !");
    } else {
      if (this.state.password !== this.state.confirmPassword) {
        toast.error("Password không giống nhau !!");
        return;
      }
      if (this.props.location && this.props.location.search) {
        let url = new URLSearchParams(this.props.location.search);
        let token = url.get("token");
        let id = url.get("id");
        let role = url.get("role");
        let res = await getUpdatePassword({
          token: token,
          id: id,
          password: this.state.password,
          role: role,
        });

        if (res && res.errCode === 0) {
          toast.success("Success reset password!");

          if (this.props.history) {
            this.props.history.push(`/login`);
          }
        } else {
          toast.error("Error reset password!");
        }
      }
    }
  };
  handleOnchangeCaptCha = async (e) => {
    let res = await postReCapTCha({
      token:e
    });
    if (res && res.errCode===0 && res.data.success) {
      this.setState({ isReCaptCha: true });
    }
  };
  render() {
    let { language } = this.props;
    let { errCode, password, confirmPassword } = this.state;
    return (
      <>
        <div className="reset-container">
          <div className="header-logo"></div>
          <form
            onSubmit={(e) => {
              this.handlerSaveUser(e);
            }}
          >
            <div className="reset-content">
              <div className="panel">
                <h2 className="h3">Enter your new password</h2>
                <div className="panel-body">
                  <div className="form-group">
                    <label>New password</label>
                    <input
                      required
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="New password"
                      value={password}
                      minLength='6'
                      onChange={(e) => this.handlerOnChangeInput(e, "password")}
                    />
                    <label className="confirm">Confirm password</label>
                    <input
                      required
                      minLength='6'
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) =>
                        this.handlerOnChangeInput(e, "confirmPassword")
                      }
                    />
                    <div className="control mt-4">
                      <ReCAPTCHA
                        ref={this.state.captchaRef}
                        sitekey={process.env.REACT_APP_SITE_KEY}
                        onChange={(e) => this.handleOnchangeCaptCha(e)}
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
                <div className="panel-footer">
                  <Link to={`/login`}>Log In</Link>
                  &nbsp;or&nbsp;
                  <Link to={`/signup`}>Sign Up</Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
