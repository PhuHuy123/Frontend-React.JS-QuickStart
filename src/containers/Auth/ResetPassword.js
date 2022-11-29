import React, { Component } from "react";
import { connect } from "react-redux";
import "./ResetPassword.scss";
import { handleCheckEmail, postReCapTCha, resetTokenPassword} from "../../services/userService";
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import ReCAPTCHA from "react-google-recaptcha";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      email: "",
      errCode: 1,
      isShowLoading: false,
    };
  }

  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    // if(this.state.errCode !== prevProps.errCode){

    // }
  }
  handlerOnChangeInput = (input, id) => {
    let copyState = { ...this.state };
    copyState[id] = input.target.value;
    this.setState({
      ...copyState,
    });
  };
  handlerSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isShowLoading: true });
    let res = await postReCapTCha({
      token:this.myRef.current.getValue()
    });
    this.myRef.current.reset();
    if (res && res.errCode===0 && res.data.success) {
      let data = await handleCheckEmail({
        email: this.state.email,
      });
      if (data && data.userData && data.userData.errCode === 0) {
        this.setState({
          errCode: 0,
          isShowLoading: false,
        });
        toast.info("Vui lòng check gmail vừa nhập!");

        window.setTimeout(async()=>{
          await resetTokenPassword({
            email: this.state.email,
          })
        },300000)
      } else {
        this.setState({ isShowLoading: false });
        toast.error("Email không tồn tại");
      }
    } else {
      this.setState({ isShowLoading: false });
      toast.error("Error: you are not done ReCaptCha !");
    }
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handlerSubmit();
    }
  };
  render() {
    let { language } = this.props;
    let { email, errCode } = this.state;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="reset-container">
            <Link to={`/home`}>
              <div className="header-logo"></div>
            </Link>
            <form onSubmit={(e) => this.handlerSubmit(e)}>
              <div className="reset-content">
                <div className="panel">
                  <h2 className="h3">Reset Password</h2>
                  {errCode && errCode !== 0 ? (
                    <div className="panel-body">
                      <p className="overview">
                        Enter your email address below and we'll send you a link
                        to reset your password.
                      </p>
                      <div className="form-group">
                        <label>Email address</label>
                        <input
                          required
                          className="form-control"
                          type="email"
                          placeholder="Email address"
                          value={this.state.username}
                          onChange={(e) =>
                            this.handlerOnChangeInput(e, "email")
                          }
                          onKeyDown={(e) => this.handleKeyDown(e)}
                        />
                        <div className="control mt-3">
                          <ReCAPTCHA
                            ref={this.myRef}
                            sitekey={process.env.REACT_APP_SITE_KEY}
                          />
                        </div>
                        <button
                          className="btn btn-primary btn-lg btn-block"
                          type="submit"
                        >
                          Reset Password
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="alert-warning">
                      Check your inbox for the next steps. If you don't receive
                      an email, and it's not in your spam folder this could mean
                      you signed up with a different address.
                    </div>
                  )}
                  <div className="panel-footer">
                    <Link to={`/login`}>Log In</Link>
                    &nbsp;or&nbsp;
                    <Link to={`/signup`}>Sign Up</Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </LoadingOverlay>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
