import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../utils";
import "./Signup.scss";
import "./Login.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { withRouter } from "react-router";
import { createNewUserAPI, postReCapTCha } from "../../services/userService";
import { toast } from "react-toastify";
import Input from "@mui/material/Input";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      genderArr: [],
      previewImgURL: "",
      isOpen: false,
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      passwordRepeat: "",
      position: "P0",
      role: "R3",
      image: "",

      action: "",
      isReCaptCha: false,
      captchaRef: null,
      errMessage: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderState();
    this.props.getPositionState();
    this.props.getRoleState();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // gender
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    // user
    if (prevProps.arrUsers !== this.props.arrUsers) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        image: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    }
  }
  handlerOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectURL,
        image: base64,
      });
    }
  };
  openPreviewImg = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };
  handlerOnChangeInput = (input, id) => {
    let copyState = { ...this.state };
    copyState[id] = input.target.value;
    this.setState({
      ...copyState,
    });
  };
  handlerSaveUser = async (e) => {
    e?.preventDefault();
    if(this.state.password !== this.state.passwordRepeat){
      return this.setState({errMessage: 'Password không giống nhau !!'})
    }
    this.setState({ isShowLoading: true });
    let res = await postReCapTCha({
      token:this.myRef.current.getValue()
    });
    this.myRef.current.reset();
    if (res && res.errCode===0 && res.data.success) {
      try {
        let res = await createNewUserAPI({
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          roleId: this.state.role,
          positionID: this.state.position,
          image: this.state.image,
          address: this.state.address,
          gender: '',
        });
        if (res && res.errCode === 0) {
          this.setState({ isShowLoading: false });
          toast.success("Đăng ký thành công!!");
          if (this.props.history) {
            this.props.history.push(`/login`);
          }
        } else {
          this.setState({ isShowLoading: false });
          toast.error("Email đã tồn tại");
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
  render() {
    const { language } = this.props;
    let genders = this.state.genderArr;

    let { email, password, firstName, lastName, phoneNumber, gender, image } =
      this.state;
    return (
        <div className="signup__container">
          <div className="container__child signup__thumbnail">
            <Link to={`/home`}>
              <div className="thumbnail__logo">
              </div>
            </Link>
            <div className="thumbnail__content text-center">
              <h1 className="heading--primary">Welcome to no fears.</h1>
              <h2 className="heading--secondary">Are you ready to join us for the health of yourself and your family?</h2>
            </div>
            <div className="thumbnail__links">
              <ul className="list-inline m-b-0 text-center">
                <li><a href="#" target="_blank"><i className="fa fa-globe"></i></a></li>
                <li><a href="#" target="_blank"><i className="fa-brands fa-facebook"></i></a></li>
                <li><a href="#" target="_blank"><i className="fa-brands fa-youtube"></i></a></li>
              </ul>
            </div>
            <div className="signup__overlay"></div>
          </div>
          <div className="container__child signup__form">
            <form onSubmit={(e)=>this.handlerSaveUser(e)}>
            <div className="col-12 mb-4 form-group login-input">
                  <TextField
                    required
                    className="form-control"
                    type="text"
                    label="FirstName"
                    value={this.state.firstName}
                    onChange={(e) => this.handlerOnChangeInput(e, 'firstName')}
                  />
              </div>
              <div className="col-12 mb-4 form-group login-input">
                  <TextField
                    required
                    className="form-control"
                    type="text"
                    label="LastName"
                    value={this.state.lastName}
                    onChange={(e) => this.handlerOnChangeInput(e, 'lastName')}
                  />
              </div>
              <div className="col-12 mb-4 form-group login-input">
                  <TextField
                    required
                    className="form-control"
                    type="email"
                    label="Email"
                    value={this.state.email}
                    onChange={(e) => this.handlerOnChangeInput(e, 'email')}
                  />
              </div>
              <div className="col-12 mb-4 form-group login-input">
                  <TextField
                    required
                    className="form-control"
                    type="password"
                    label="Password"
                    inputProps={{ minLength: 6 }}
                    value={this.state.password}
                    onChange={(e) => this.handlerOnChangeInput(e, 'password')}
                  />
              </div>
              <div className="col-12 mb-4 form-group login-input">
                  <TextField
                    required
                    className="form-control"
                    type="password"
                    label="PasswordRepeat"
                    inputProps={{ minLength: 6 }}
                    value={this.state.passwordRepeat}
                    onChange={(e) => this.handlerOnChangeInput(e, 'passwordRepeat')}
                  />
              </div>
              <div className="col-12" style={{ color: "red" }}>
                  {this.state.errMessage}
                </div>
              <div className="col-12 mb-4 reCaptCha">
                  <ReCAPTCHA
                    ref={this.myRef}
                    sitekey={process.env.REACT_APP_SITE_KEY}
                  />
                </div>
              <div className="m-t-lg ml-3">
                <ul className="list-inline">
                  <li>
                    <input className="btn btn--form" type="submit" value="Register" />
                  </li>
                  <li className="mt-2">
                    <span className="signup__link ">Do you already have an account: </span>
                    <Link to={`/login`}>Login</Link>
                  </li>
                </ul>
              </div>
            </form>  
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoading: state.admin.isLoading,
    arrUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderState: () => dispatch(actions.fetchGenderStart()),
    getPositionState: () => dispatch(actions.fetchPositionStart()),
    getRoleState: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    // processLogout: () => dispatch(actions.processLogout()),
    // onChangeLanguage: (language)=>(dispatch(setChangeLanguage(language)))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
